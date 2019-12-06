<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $username = $request['query']['username'];
  if (!isset($username)) { throw new ApiError('Username required', 400); }
  $user_id = get_user_id($link, $username);
  $_SESSION['user_id'] = $user_id;
  $response['body'] = $user_id;
  send($response);
}

function get_user_id($link, $username) {
  $sql = "
    SELECT `id`
    FROM `users`
    WHERE `name` = ?
  ";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 's', $username);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  if (!mysqli_num_rows($result)) {
    mysqli_stmt_close($stmt);
    throw new ApiError('User data not found', 404);
  }
  $user_data = mysqli_fetch_assoc($result);
  $user_id = $user_data['id'];
  mysqli_stmt_close($stmt);
  return $user_id;
}
