<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $username = $request['query']['username'];
  $username = filter_var($username, FILTER_SANITIZE_SPECIAL_CHARS);
  if (!isset($username)) { throw new ApiError('Username required', 400); }
  $response['body'] = get_user_id($link, $username);
  send($response);
}

function get_user_id($link, $username) {
  $sql = "
    SELECT `id`
    FROM `users`
    WHERE `name` = '$username'
  ";
  $result = mysqli_query($link, $sql);
  if (!mysqli_num_rows($result)) { throw new ApiError('User data not found', 404); }
  $user_data = mysqli_fetch_assoc($result);
  $user_id = $user_data['id'];
  return $user_id;
}
