<?php

$link = get_db_link();

if(!isset($_SESSION['user_id'])){
    throw new ApiError('User is not logged in.',400);
  }

if($request['method'] === 'GET'){
  $response['body'] = get_all_list_items($link);
  send($response);
}

if ($request['method'] === 'POST') {
  add_list_item();
}

if ($request['method'] === 'DELETE') {
  delete_list_item();
}

if ($request['method'] === 'PATCH') {
  edit_list_item();
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

function add_list_item(){
  return;
}

function delete_list_item(){
  return;
}

function edit_list_item(){
  return;
}
