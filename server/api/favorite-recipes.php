<?php

require_once '_helpers.php';
require_once '_api-keys.php';

$link = get_db_link();

if ($request['method'] === 'GET') {
  $response['body'] = get_all_favorites($link);
  send($response);
} elseif ($request['method'] === 'POST') {
  $body_is_valid = isset($request['body']['recipeId']) &&
    isset($request['body']['recipeName']) &&
    isset($request['body']['recipeImage']);
  if (!$body_is_valid) {
    throw new ApiError("Missing field from request body", 400);
  }
  $response['body'] = [
    'id' => $request['body']['recipeId'],
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
    'id' => $request['body']['recipeId'],
    'isFavorite' => unfavorite_recipe($link, $request['body']['recipeId'])
  ];
  send($response);
}

function add_favorite_recipe($link, $recipe_id, $name, $image){
  $sql = "
    INSERT INTO
    `favoriteRecipes`
      (`id`,`userId`,`recipeId`,`name`,`image`)
    VALUES
      (NULL, ?, ?, ?, ?)";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 'ddss', $_SESSION['user_id'], $recipe_id, $name, $image );
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  return true;
}

function unfavorite_recipe($link, $recipe_id){
  $sql = "
    DELETE FROM `favoriteRecipes`
    WHERE `favoriteRecipes`.`recipeId` = ?
    AND `favoriteRecipes`.`userId` = ?";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 'dd', $recipe_id, $_SESSION['user_id']);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  return false;
}

function get_all_favorites($link){
  $sql = "
    SELECT `name`, `image`, `recipeId` AS `id`
    FROM `favoriteRecipes`
    WHERE `favoriteRecipes`.`userId` = ?";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 'd', $_SESSION['user_id']);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
  mysqli_stmt_close($stmt);
  return $data;
}
