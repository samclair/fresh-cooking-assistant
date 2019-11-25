<?php

if ($request['method'] === 'GET') {
  $link = get_db_link();
  $result = check_connection($link);
  $response['body'] = $result;
  send($response);
}

function check_connection($link) {
  $sql = 'select 1';
  $link->query($sql);
  return [
    'message' => 'Successfully connected to MySQL!'
  ];
}
