<?php

include_once '_helpers.php';
$link = get_db_link();

if ($request['method'] === 'GET') {
  if(!isset($request['query']['seasonName'])) { throw new ApiError('Season name required.', 400); }
  $season_name = $request['query']['seasonName'];
  $season_id = get_season_id($link, $season_name);
  $response['body'] = get_produce_list($link, $season_id);
  send($response);
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
