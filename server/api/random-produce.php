<?php

include_once '_helpers.php';
$link = get_db_link();

if ($request['method'] === 'GET') {
  $season_name = $request['query']['seasonName'];
  if (!isset($season_name)) { $season_id = 'ANY (SELECT `id` FROM `seasons`)'; }
  else { $season_id = get_season_id($link, $request['query']['seasonName']); }
  $produce_list = get_produce_list($link, $season_id);
  $random_list = [];
  $count = intval($request['query']['randCount']);
  if (!isset($count) || $count === 0) { $count = 1; }
  else if ($count > count($produce_list)) { $count = count($produce_list); }
  for ($iter = 0; $iter < $count; ++$iter) {
    $random_index = rand(0, count($produce_list) - 1);
    $random_produce = array_splice($produce_list, $random_index, 1)[0];
    array_push($random_list, $random_produce);
  }
  $response['body'] = $random_list;
  send($response);
}
