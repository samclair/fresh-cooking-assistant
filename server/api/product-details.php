<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $produce_id = $request['query']['produceId'];
  $produce_id = intval($produce_id);
  if ($produce_id <= 0) {throw new ApiError('Valid Produce ID required', 400); }
  $response['body'] = 'Hello There!';
  send($response);
}
