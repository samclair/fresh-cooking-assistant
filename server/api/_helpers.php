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
