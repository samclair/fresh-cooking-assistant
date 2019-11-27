<?php

include_once '_helpers.php';
$link = get_db_link();

if ($request['method'] === 'GET') {
  if (!isset($request['query']['produceName'])) {throw new ApiError('Produce name required.', 400); }
  $produce_name = $request['query']['produceName'];
  $produce_id = get_produce_id($link, $produce_name);
  $produce_details = get_produce_details($link, $produce_id);
  $seasonality_dates = get_produce_seasonality($link, $produce_id);
  $is_in_season = check_in_season($seasonality_dates);
  $response['body'] = [
    details => $produce_details,
    isInSeason => $is_in_season
  ];
  send($response);
}

function get_produce_id($link, $produce_name) {
  $sql = "
    SELECT `id`
    FROM `produce`
    WHERE `name` = '$produce_name'
    ";
  $result = mysqli_query($link, $sql);
  if (!mysqli_num_rows($result)) {throw new ApiError('Page not found.', 404); }
  $data = mysqli_fetch_assoc($result);
  return $data['id'];
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

function get_produce_seasonality($link, $produce_id) {
  $sql = "
    SELECT `startDate`, `endDate`
    FROM `seasons`
    JOIN `produceSeasons`
      ON `seasons`.`id` = `produceSeasons`.`seasonId`
    WHERE `produceId` = $produce_id
  ";
  $result = mysqli_query($link, $sql);
  if (!mysqli_num_rows($result)) {throw new ApiError('Seasonal data not found', 404); }
  $seasonality_dates = mysqli_fetch_all($result, MYSQLI_ASSOC);
  return $seasonality_dates;
}
