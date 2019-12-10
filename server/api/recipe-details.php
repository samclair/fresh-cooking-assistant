<?php

require_once '_helpers.php';
require_once '_api-keys.php';

if($request['method']==='GET'){
  $recipe_id = $request['query']['recipeId'];
  if(!isset($recipe_id)) { throw new ApiError("Recipe Id is required", 400); }
  $recipe_data = get_recipe_details ($recipe_id, $tasty_api_key);
  $response_body = format_response_body($recipe_data);
  $response['body'] = $response_body;
  send($response);
}

function format_response_body($data){
  $instruction_list = [];
  $all_ingredients = [];
  foreach ($data->instructions as $instruction){
      array_push($instruction_list,$instruction->display_text);
    };
  $sections = [];
  foreach ($data->sections as $section){
    $newSection = ["name"=> $section->name];
    $ingredient_list = [];
    foreach ($section->components as $ingredient){
    $ingredient_singular = $ingredient->ingredient->display_singular;
    $ingredient_plural = $ingredient->ingredient->display_plural;
    $measurement_string = '';
    if($ingredient->raw_text === 'n/a'){
      $measurement_string = format_measurement_string($ingredient, $ingredient_singular, $ingredient_plural);
    } else {
      $measurement_string = $ingredient->raw_text;
    }
    array_push($ingredient_list, [
      'measurement'=>$measurement_string,
      'ingredient'=>$ingredient_singular,
      'isInDatabase' => ingredient_is_in_database($ingredient_singular, $ingredient_plural)
    ]);
    array_push($all_ingredients, $measurement_string);
      $newSection['ingredients']=$ingredient_list;
  }
  array_push($sections, $newSection);
}
  $response = [
    'details' => [
      'id' => $data->id,
      'image' => $data->thumbnail_url,
      'name' => $data->name,
      'servings' => $data->yields,
      'sections' => $sections,
      'instructions' => $instruction_list
    ],
    'allIngredients' => $all_ingredients,
    'isFavorite' => check_if_favorite_recipe($data -> id)
  ];
  return $response;
};

function get_recipe_details($id, $api_key){
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://tasty.p.rapidapi.com/recipes/detail?id=$id",
    CURLOPT_HTTPGET => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => [
      "x-rapidapi-host: tasty.p.rapidapi.com",
      "x-rapidapi-key: $api_key"
    ],
  ));
  $response = curl_exec($curl);
  $err = curl_error($curl);
  curl_close($curl);
  if ($err) { throw new ApiError("cURL Error #: $err"); }
  return json_decode($response);
}

function check_if_favorite_recipe($recipe_id) {
  $link = get_db_link();
  if (!isset($_SESSION['user_id'])) { return; }
  $user_id = $_SESSION['user_id'];
  $sql = "
    SELECT `id`
    FROM `favoriteRecipes`
    WHERE `recipeId` = ?
    AND `userId` = ?
  ";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 'dd', $recipe_id, $user_id);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  $isFavorite = (mysqli_num_rows($result) > 0);
  mysqli_stmt_close($stmt);
  return $isFavorite;
}

function format_measurement_string($ingredient,$ingredient_singular, $ingredient_plural){
  $measurement = $ingredient->measurements[0];
  $ingredient_quantity = $measurement->quantity !== '0' ?
    $measurement->quantity
    : '';
  $measurement_unit = $ingredient_quantity < 1 ?
    $measurement->unit->display_singular :
    $measurement->unit->display_plural;
  $extra_comment = $ingredient->extra_comment;
  $ingredient_name = $measurement_unit || $ingredient_quantity < 1 ?
    $ingredient_singular
    : $ingredient_plural;
  return "$ingredient_quantity $measurement_unit $ingredient_name $extra_comment";
}
