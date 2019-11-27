<?php

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
