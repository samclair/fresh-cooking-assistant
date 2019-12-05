
<?php

require_once '_helpers.php';
require_once '_api-keys.php';

if($request['method'] === 'POST'){
  $body_is_valid = isset($request['body']['userId']) &&
    isset($request['body']['recipeId']) &&
    isset($request['body']['recipeName']) &&
    isset($request['body']['recipeImage']);

  if(!$body_is_valid){
    throw new ApiError("Missing field from request body",400);
  }
  $response['body'] = [
    'userId' =>  $request['body']['userId'],
    'recipeId' => $request['body']['recipeId'],
    'recipeName' => $request['body']['recipeName'],
    'recipeImage' => $request['body']['recipeImage']

  ];
  send($response);
};
