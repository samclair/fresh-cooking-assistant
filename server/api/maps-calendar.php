<?php

if ($request['method'] === 'GET') {
  $expected_params = ['text', 'details', 'location', 'dates'];
  foreach ($expected_params as $param) {
    if (!isset($request['query'][$param])) { throw new ApiError("$param required", 400); }
  }
  $text = $request['query']['text'];
  $details = $request['query']['details'];
  $location = $request['query']['location'];
  $dates = $request['query']['date'];
  $calendar_link = create_calendar_link($text, $details, $location, $dates);
  $response['body'] = $calendar_link;
  send($response);
}

function create_calendar_link($text, $details, $location, $dates) {
  $location = urlencode($location);
  $dates = format_dates($dates);
  $link ='https://www.google.com/calendar/render?action=TEMPLATE'
    ."&text=$text&details=$details&location=$location&dates=$dates";
  return $link;
}

function format_dates($dates) {
  $day = explode(': ', $dates)[0];
  $times = explode(': ', $dates)[1];
  $open = explode(' - ', $times)[0];
  $open = date(DATE_ISO8601, strtotime("next $day $open"));
  $open_date = explode('T', $open)[0];
  $open_date = str_replace('-', '', $open_date);
  $open_time = explode('T', $open)[1];
  $open_time = str_replace(':', '', explode('-',$open_time)[0]);
  $close = explode(' - ', $times)[1];
  $close = date(DATE_ISO8601, strtotime("next $day $close"));
  $close_date = explode('T', $close)[0];
  $close_date = str_replace('-', '', $close_date);
  $close_time = explode('T', $close)[1];
  $close_time = str_replace(':', '', explode('-',$close_time)[0]);
  return urlencode("{$open_date}T{$open_time}Z/{$close_date}T{$close_time}Z");
}
