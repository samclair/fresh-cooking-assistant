<?php

require_once '_helpers.php';
require_once '_api-keys.php';

if($request['method']==='GET'){
  if(!isset($request['query']['recipeId'])){
    throw new ApiError("Recipe Id is required", 400);
  }
  $recipeData = getRecipeDetails ($request['query']['recipeId'],$tasty_api_key);
  $response['body'] = $recipeData;
  send($response);
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
