<?php

function check_in_season($link, $seasons) {
  $current_season = get_current_season($link);
  return (in_array($current_season['id'], $seasons));
}

function get_current_season($link) {
  $sql = "
    SELECT *
    FROM `seasons`
  ";
  $result = mysqli_query($link, $sql);
  if (!mysqli_num_rows($result)) {throw new ApiError('Season data not found', 502); }
  $seasons = mysqli_fetch_all($result, MYSQLI_ASSOC);
  foreach ($seasons as $season) {
    $start_date = strtotime($season['startDate']);
    $end_date = strtotime($season['endDate']);
    if ($start_date <= time() && $end_date >= time()) {
      return [ id => $season['id'], name => $season['name'] ];
    }
  }
}

function get_produce_list($link, $season_id) {
  $sql = "
    SELECT `produce`.`id`, `name`, `produceImg`
    FROM `produce`
    JOIN `produceSeasons`
      ON `produce`.`id` = `produceSeasons`.`produceId`
    WHERE `seasonId` = $season_id
    ";
  $result = mysqli_query($link, $sql);
  if (!mysqli_num_rows($result)) { $produce = []; }
  else { $produce = mysqli_fetch_all($result, MYSQLI_ASSOC); }
  return $produce;
}

function get_season_id($link, $season_name) {
  $sql = "
    SELECT `id`
    FROM `seasons`
    WHERE `name` = '$season_name'
  ";
  $result = mysqli_query($link, $sql);
  if (!mysqli_num_rows($result)) {throw new ApiError('Page not found.', 404); }
  $data = mysqli_fetch_assoc($result);
  return $data['id'];
}
