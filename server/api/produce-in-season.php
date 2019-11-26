<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $season_id = ($request['query']['seasonId']);
  $season_id = intval($season_id);
  if($season_id <= 0) { throw new ApiError('Valid Season ID required', 400); }
  $response['body'] = check_produce_in_season($link, $season_id);
  send($response);
}

function check_produce_in_season($link, $season_id) {
  $sql = "
    SELECT `produce`.`id`, `name`
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
