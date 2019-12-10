<?php

require_once '_api-keys.php';

if ($request['method'] === "GET") {
  $location;
  if (!isset($request['query']['location'])) { $location = '32.956423,-117.040781'; }
  else { $location = $request['query']['location']; }
  $results = get_farmers_market_list($maps_api_key, $location);
  $response['body'] = $results;
  send($response);
}

function get_farmers_market_list($maps_api_key, $location) {
  $ch = curl_init();
  $options = [
    CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
      ."key=$maps_api_key&locationbias=circle:25000@$location&query=farmers+market",
    CURLOPT_HTTPGET => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_RETURNTRANSFER => true
  ];
  curl_setopt_array($ch,$options);
  $results = curl_exec($ch);
  $error = curl_error($ch);
  curl_close($ch);
  return $error ? $error : json_decode($results);
}
