<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  if(!isset($request['query']['seasonId'])) {
    throw new ApiError('Valid Season ID required', 400);
  }
  $season_id = $request['query']['seasonId'];
  $response['body'] = 'Hello there!';
  send($response);
}

function check_produce_in_season($link, $season_id) {
  return null;
}
