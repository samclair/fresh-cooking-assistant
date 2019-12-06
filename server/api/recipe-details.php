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
  foreach ($data->instructions as $instruction){
      array_push($instruction_list,$instruction->display_text);
    };
  $ingredient_list = [];
  foreach ($data->sections[0]->components as $ingredient){
    $ingredient_singular = $ingredient->ingredient->display_singular;
    $ingredient_plural = $ingredient->ingredient->display_plural;
    array_push($ingredient_list, [
      'measurement'=>$ingredient->raw_text,
      'ingredient'=>$ingredient_singular,
      'isInDatabase' => ingredient_is_in_database($ingredient_singular, $ingredient_plural)
    ]);
  }
  $response = [
    'id' => $data->id,
    'image' => $data->thumbnail_url,
    'name' => $data->name,
    'servings' => $data->yields,
    'ingredients' => $ingredient_list,
    'instructions' => $instruction_list,
    'isFavorite' => check_if_favorite_recipe($data -> id)
  ];
  return $response;
};

function ingredient_is_in_database($ingredient_singular, $ingredient_plural) {
  $link = get_db_link();
  $sql = "SELECT name
  FROM `produce`
  WHERE produce.name = '$ingredient_singular'
  OR produce.name = '$ingredient_plural'";
  $result = mysqli_fetch_row(mysqli_query($link,$sql));
  return $result ? $result[0] : false;
}


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
  $user_id = $_SESSION['user_id'];
  $sql = "
    SELECT `id`
    FROM `favoriteRecipes`
    WHERE `recipeId` = $recipe_id
    AND `userId` = '$user_id'
  ";
  $result = mysqli_query($link, $sql);
  $isFavorite = (mysqli_num_rows($result) > 0);
  return $isFavorite;
}
