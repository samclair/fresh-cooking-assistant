<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $produce_id = $request['query']['produceId'];
  $produce_id = intval($produce_id);
  if ($produce_id <= 0) {throw new ApiError('Valid Produce ID required', 400); }
  $response['body'] = 'Hello There!';
  send($response);
}

function get_produce_details($link, $produce_id) {
  $sql = "
    SELECT `name`, `selection`, `storage`, `nutrition`, `produceImg`
    FROM `produce`
    WHERE `id` = $produce_id
  ";
  $result = mysqli_query($link, $sql);
  if (!mysqli_num_rows($result)) {throw new ApiError('Produce details not found', 404); }
  $produce = mysqli_fetch_assoc($result);
  return $produce;
}
