<?php

include_once '_helpers.php';
$link = get_db_link();

if ($request['method'] === 'GET') {
  if(!isset($request['query']['seasonName'])) { throw new ApiError('Season name required.', 400); }
  $season_name = $request['query']['seasonName'];
  $season_id = get_season_id($link, $season_name);
  $produce_list = get_produce_list($link, $season_id);
  $current_season = get_current_season($link)['id'];
  $response['body'] = [ produceList => $produce_list ];
  if ($season_id === $current_season) { $response['body']['isCurrentSeason'] = true; }
  else { $response['body']['isCurrentSeason'] = false; }
  send($response);
}
