<?php

require_once '_helpers.php';
require_once '_api-keys.php';

if($request['method']==='GET'){
  if(!isset($request['query']['recipeId'])){
    throw new ApiError("Recipe Id is required", 400);
  }
  $recipe_data = get_recipe_details ($request['query']['recipeId'],$tasty_api_key);
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
    $ingredient_singular = ucwords($ingredient->ingredient->display_singular);
    $ingredient_plural = ucwords($ingredient->ingredient->display_plural);
    array_push($ingredient_list,[
      'measurement'=>$ingredient->raw_text,
      'ingredient'=>$ingredient_singular,
      'isInDatabase' => ingredient_is_in_database($ingredient_singular,$ingredient_plural)
      ]);
  }
  $response = [
    'id' => $data->id,
    'image' => $data->thumbnail_url,
    'name' => $data->name,
    'servings' => $data->yields,
    'ingredients' => $ingredient_list,
    'instructions' => $instruction_list
  ];
  return $response;
};

function ingredient_is_in_database($ingredient_singular,$ingredient_plural){
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
    CURLOPT_HTTPHEADER => array(
      "x-rapidapi-host: tasty.p.rapidapi.com",
      "x-rapidapi-key: $api_key"
    ),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    throw new ApiError("cURL Error #:" . $err);
  } else {
    error_log(gettype($response));
    return json_decode($response);
  }
}
