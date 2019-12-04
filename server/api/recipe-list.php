<?php

require_once '_api-keys.php';
require_once '_helpers.php';

if ($request['method'] === 'GET') {
  $tags = $request['query']['tags'];
  if (!isset($tags)) { throw new ApiError("Search tag required", 400); }
  $response['body'] = get_recipe_list($tags, $count, $tasty_api_key);
  send($response);
}

function get_recipe_list($tags, $count, $tasty_api_key) {
  $ch = curl_init();
  $options = [
    CURLOPT_URL => "https://tasty.p.rapidapi.com/recipes/list?q=$tags",
    CURLOPT_HTTPGET => true,
    CURLOPT_HTTPHEADER => [
      'x-rapidapi-host: tasty.p.rapidapi.com',
      "x-rapidapi-key: $tasty_api_key"
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 10
  ];
  curl_setopt_array($ch, $options);
  $result = curl_exec($ch);
  $error = curl_error($ch);
  curl_close($ch);
  return $error ? $error : json_decode($result);
}
