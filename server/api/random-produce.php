<?php

include_once '_helpers.php';
$link = get_db_link();

if ($request['method'] === 'GET') {
  $season_id = null;
  if (isset($request['query']['seasonName'])) {
    $season_id = get_season_id($link, $request['query']['seasonName']);
  } else { $season_id = '*'; }
  $produce_list = get_produce_list($link, $season_id);
}
