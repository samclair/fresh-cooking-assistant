<?php

require_once '_api-keys.php';

if ($request['method'] === 'GET') {
  $place_id = $request['query']['placeId'];
  if (!isset($place_id)) { throw new ApiError('Location ID required', 400); }
  $response['body'] = get_location_details($maps_api_key, $place_id);
  send($response);
}

function get_location_details($maps_api_key, $place_id) {
  $ch = curl_init();
  $options = [
    CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/details/json'
      ."?key=$maps_api_key&place_id=$place_id",
    CURLOPT_HTTPGET => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_RETURNTRANSFER => true
  ];
  curl_setopt_array($ch,$options);
  $data = curl_exec($ch);
  $error = curl_error($ch);
  curl_close($ch);
  return $error ? $error : json_decode($data);
}
