<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $username = $request['query']['username'];
  if (!isset($username)) { throw new ApiError('Username required', 400); }
  $user_id = get_user_id($link, $username);
  $_SESSION['user_id'] = $user_id;
  $response['body'] = $user_id;
  send($response);
} elseif ($request['method'] === 'POST') {
  $username = $request['query']['username'];
  if (!isset($username)) { throw new ApiError('Username required', 400); }
  if (get_user_id($link, $username)) { throw new ApiError('Username already taken', 409); }
  $user_id = add_new_user($link, $username);
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
  if (!mysqli_num_rows($result)) { return false; }
  $user_data = mysqli_fetch_assoc($result);
  $user_id = $user_data['id'];
  mysqli_stmt_close($stmt);
  return $user_id;
}

function add_new_user($link, $username) {
  $sql = "
    INSERT INTO `users` (`id`, `name`, `createdAt`)
    VALUES(NULL, ?, CURRENT_TIMESTAMP)
  ";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 's', $username);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  $user_id = get_user_id($link, $username);
  return $user_id;
}
