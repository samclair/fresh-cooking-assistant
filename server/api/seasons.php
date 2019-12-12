<?php

include_once '_helpers.php';
$link = get_db_link();

if ($request['method'] === 'GET') {
  $seasons = get_seasons($link);
  $current_season = get_current_season($link);
  $response['body'] = [
    'seasons' => $seasons,
    'currentSeason' => $current_season
  ];
  send($response);
}

function get_seasons($link) {
  $sql = "
    SELECT `id`, `name`
    FROM `seasons`
  ";
  $result = mysqli_query($link, $sql);
  if (!mysqli_num_rows($result)) {throw new ApiError('Season data not found', 404); }
  $seasons = mysqli_fetch_all($result, MYSQLI_ASSOC);
  return $seasons;
}
