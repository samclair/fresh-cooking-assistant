<?php

require_once '_helpers.php';

$link = get_db_link();

if(!isset($_SESSION['user_id'])){
    throw new ApiError('User is not logged in.',400);
  }

if($request['method'] === 'GET'){
  $list_data = get_all_list_items($link);
  $response['body'] = format_fresh_list_response($list_data);
  send($response);
}

if ($request['method'] === 'POST') {
  if(!isset($request['body']['name'])){
    throw new ApiError('One or more items needed to add',400);
  }
  $response['body'] = add_list_item($link, $request['body']['name']);
  send($response);
}

if ($request['method'] === 'DELETE') {
  if(isset($request['body']['name'])){
  delete_list_item($link, $request['body']['name']);
}
  else{
  $response['body'] = delete_all_list_items($link);
  send($response);
  }
}

if ($request['method'] === 'PATCH') {
  edit_list_item($link, $request['body']);
}

function get_all_list_items($link){
  $sql = "
    SELECT `name`, `isComplete`
    FROM `favoriteProduceItems`
    WHERE `favoriteProduceItems`.`userId` = ?";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 'd', $_SESSION['user_id']);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
  mysqli_stmt_close($stmt);
  return $data;
}

function add_list_item($link,$item){
  $sql = "
    INSERT INTO
    `favoriteProduceItems`
      (`userId`,`name`,`isComplete`)
    VALUES
      (?, ?, false)";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 'ds', $_SESSION['user_id'],$item);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  return true;
}

function delete_list_item($link,$item){
  $sql = "
    DELETE FROM `favoriteProduceItems`
    WHERE `favoriteProduceItems`.`name` = ?
    AND `favoriteProduceItems`.`userId` = ?";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 'sd', $item, $_SESSION['user_id']);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  return false;
}

function delete_all_list_items($link){
  $sql = "
    DELETE FROM `favoriteProduceItems`
    WHERE `favoriteProduceItems`.`userId` = ?";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 's', $_SESSION['user_id']);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  return false;
}

function edit_list_item($link,$item){
  return;
}

function format_fresh_list_response($list_data){
  $body = [];
  foreach($list_data as $value){
    $listItem = $value->name;
    array_push($body,[
      'details'=>$value,
      'isInDatabase'=>ingredient_is_in_database($listItem,$listItem)
      ]);
  }
  return $body;
}