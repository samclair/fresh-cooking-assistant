<?php

require_once '_helpers.php';
require_once '_api-keys.php';

if($request['method']==='GET'){
  if(!isset($request['query']['recipeId'])){
    throw new ApiError("Recipe Id is required", 400);
  }
  $recipeData = getRecipeDetails ($request['query']['recipeId'],$tasty_api_key);
  $responseBody = formatResponseBody($recipeData);
  $response['body'] = $responseBody;
  send($response);
}

function formatResponseBody($data){
  $instructionList = [];
  foreach ($data->instructions as $instruction){
      array_push($instructionList,$instruction->display_text);
    };
  $ingredientList = [];
  foreach ($data->sections[0]->components as $ingredient){
    array_push($ingredientList,[
      'measurement'=>$ingredient->raw_text,
      'ingredient'=>$ingredient->ingredient->display_plural,
      'isInDatabase' => ingredientIsInDatabase(ucwords($ingredient->ingredient->display_plural))
      ]);
  }
  $response = [
    'id' => $data->id,
    'image' => $data->thumbnail_url,
    'name' => $data->name,
    'servings' => $data->yields,
    'ingredients' => $ingredientList,
    'instructions' => $instructionList
  ];
  return $response;
};

function ingredientIsInDatabase($ingredient){
  $link = get_db_link();
  $sql = "SELECT name
  FROM `produce`
  WHERE produce.name = '$ingredient'";
  $result = mysqli_fetch_all(mysqli_query($link,$sql));
  return $result ? $ingredient : false;
}


function getRecipeDetails($id, $api_key){
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
