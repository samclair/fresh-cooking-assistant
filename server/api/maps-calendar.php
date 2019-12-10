<?php

if ($request['method'] === 'GET') {
  $expected_params = ['text', 'details', 'location', 'dates'];
  foreach ($expected_params as $param) {
    if (!isset($request['query'][$param])) { throw new ApiError("$param required", 400); }
  }
  $response['body'] = 'Did you ever hear the tragedy of Darth Plageius the Wise?';
  send($response);
}
