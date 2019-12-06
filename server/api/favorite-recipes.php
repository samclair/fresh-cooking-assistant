<?php

require_once '_helpers.php';
require_once '_api-keys.php';

$link = get_db_link();

if ($request['method'] === 'GET') {
  $response['body'] = [
    'favoriteRecipes' => get_all_favorites($link)
  ];
  send($response);
} elseif ($request['method'] === 'POST') {
  $body_is_valid = isset($request['body']['recipeId']) &&
    isset($request['body']['recipeName']) &&
    isset($request['body']['recipeImage']);
  if (!$body_is_valid) {
    throw new ApiError("Missing field from request body", 400);
  }
  $response['body'] = [
    'recipeId' => $request['body']['recipeId'],
    'isFavorite' => add_favorite_recipe(
      $link,
      $request['body']['recipeId'],
      $request['body']['recipeName'],
      $request['body']['recipeImage']
    )
  ];
  send($response);
} elseif ($request['method'] === 'DELETE') {
  if (!isset($request['body']['recipeId'])) {
    throw new ApiError("Recipe Id is required");
  }
  $response['body'] = [
    'recipeId' => $request['body']['recipeId'],
    'isFavorite' => unfavorite_recipe($link, $request['body']['recipeId'])
  ];
  send($response);
}

function add_favorite_recipe($link, $recipe_id, $name, $image)
{
  error_log($recipe_id);
  $sql = "INSERT INTO
  `favoriteRecipes`
    (`id`,`userId`,`recipeId`,`name`,`image`)
  VALUES
    (NULL, {$_SESSION['user_id']}, $recipe_id, '$name', '$image')";
  mysqli_query($link, $sql);
  return true;
}

function unfavorite_recipe($link, $recipe_id)
{
  $sql = "DELETE FROM `favoriteRecipes`
  WHERE `favoriteRecipes`.`recipeId` = $recipe_id
  AND `favoriteRecipes`.`userId` = {$_SESSION['user_id']}";
  mysqli_query($link, $sql);
  return false;
}

function get_all_favorites($link)
{
  $sql = "SELECT `name`, `image`, `recipeId`
  FROM `favoriteRecipes`
  WHERE `favoriteRecipes`.`userId` = {$_SESSION['user_id']}";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_assoc($result);
}
