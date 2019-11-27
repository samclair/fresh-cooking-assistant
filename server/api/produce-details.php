<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $produce_id = $request['query']['produceId'];
  $produce_id = intval($produce_id);
  if ($produce_id <= 0) {throw new ApiError('Valid Produce ID required', 400); }
  $produce_details = get_produce_details($link, $produce_id);
  $seasonality_dates = get_produce_seasonality($link, $produce_id);
  $is_in_season = check_in_season($seasonality_dates);
  $response['body'] = [
    details => $produce_details,
    isInSeason => $is_in_season
  ];
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

function check_in_season($seasonality_dates) {
  $now = time();
  foreach ($seasonality_dates as $start_end) {
    $start_date = strtotime($start_end['startDate']);
    $end_date = strtotime($start_end['endDate']);
    if ($now >= $start_date && $now <= $end_date ) {
      return true;
    }
  }
  return false;
}
