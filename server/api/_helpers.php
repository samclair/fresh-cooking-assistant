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
      return [ 'id' => $season['id'], 'name' => $season['name'] ];
    }
  }
}

function get_produce_list($link, $season_id) {
  $sql = "
    SELECT DISTINCT `produce`.`id`, `name`, `produceImg`
    FROM `produce`
    JOIN `produceSeasons`
      ON `produce`.`id` = `produceSeasons`.`produceId`
    WHERE `seasonId` = ?
    ";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 'd', $season_id);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  if (!mysqli_num_rows($result)) { $produce = []; }
  else { $produce = mysqli_fetch_all($result, MYSQLI_ASSOC); }
  return $produce;
}

function get_season_id($link, $season_name) {
  $sql = "
    SELECT `id`
    FROM `seasons`
    WHERE `name` = ?
  ";
  $stmt = mysqli_prepare($link, $sql);
  mysqli_stmt_bind_param($stmt, 's', $season_name);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  if (!mysqli_num_rows($result)) {throw new ApiError('Page not found.', 404); }
  $data = mysqli_fetch_assoc($result);
  return $data['id'];
}
