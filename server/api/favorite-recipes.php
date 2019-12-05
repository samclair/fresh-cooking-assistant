<?php

require_once '_helpers.php';
require_once '_api-keys.php';

$link = get_db_link();

if($request['method'] === 'POST'){
  $body_is_valid = isset($request['body']['recipeId']) &&
    isset($request['body']['recipeName']) &&
    isset($request['body']['recipeImage']);
  if(!$body_is_valid){
    throw new ApiError("Missing field from request body",400);
  }
  $response['body'] = [
    'recipeId' => $request['body']['recipeId'],
    'isFavorited' => add_favorite_recipe(
      $link,
      $request['body']['recipeId'],
      $request['body']['recipeName'],
      $request['body']['recipeImage']
      )
  ];
  send($response);
}
elseif($request['method'] === 'DELETE'){
  if(!isset($request['body']['recipeId'])){
    throw new ApiError("Recipe Id is required");
  }
}

function add_favorite_recipe($link, $recipe_id, $name, $image){
  $sql = "INSERT INTO `favoriteProduce`
  (`userId`,`recipeId`,`name`,`image`)
  VALUES
  ({$_SESSION['user_id']}, $recipe_id, $name, $image)";
  mysqli_query($link, $sql);
  return true;
}
