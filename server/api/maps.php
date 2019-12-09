<?php

require_once '_api-keys.php';

if ($request['method'] === "GET") { }

function get_farmers_market_details($maps_key)
{
  $ch = curl_init();
  $options = [
    CURLOPT_URL => "https://maps.googleapis.com/maps/api/place/textsearch/json?key=$maps_key&query=farmer's+market",
    CURLOPT_HTTPGET => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_RETURNTRANSFER => true
  ];
  curl_setopt_array($ch,$options);
  $results = curl_exec($ch);
  $error = curl_exec($ch);
  curl_close($ch);
  return $error ? $error : json_decode($results)
}
