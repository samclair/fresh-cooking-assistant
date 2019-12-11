<?php

require_once '_api-keys.php';

if ($request['method'] === 'GET') {
  $place_id = $request['query']['placeId'];
  if (!isset($place_id)) { throw new ApiError('Place ID required', 400); }
  $data = get_location_details($maps_api_key, $place_id);
  $response['body'] = $data -> result;
  send($response);
}

function get_location_details($maps_api_key, $place_id) {
  $ch = curl_init();
  $options = [
    CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/details/json'
      ."?key=$maps_api_key&place_id=$place_id"
      .'&fields=formatted_address,name,opening_hours/weekday_text,website',
    CURLOPT_HTTPGET => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_RETURNTRANSFER => true
  ];
  curl_setopt_array($ch,$options);
  $data = json_decode(curl_exec($ch));
  $error = curl_error($ch);
  curl_close($ch);
  if (!$data -> result) { throw new ApiError('Place not found', 404); }
  return $error ? $error : $data;
}
