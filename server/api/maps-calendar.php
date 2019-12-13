<?php

if ($request['method'] === 'GET') {
  $expected_params = ['text', 'location', 'dates'];
  foreach ($expected_params as $param) {
    if (!isset($request['query'][$param])) { throw new ApiError("$param required", 400); }
  }
  $text = $request['query']['text'];
  $location = $request['query']['location'];
  $dates = $request['query']['dates'];
  $calendar_link = create_calendar_link($text, $location, $dates);
  $response['body'] = $calendar_link;
  send($response);
}

function create_calendar_link($text, $location, $dates) {
  $text = urlencode($text);
  $details = urlencode("Farmer's Market");
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
  $open_formatted = date('Ymd', strtotime("next $day $open"));
  $open_formatted .= 'T'.date('His', strtotime("next $day $open")).'Z';
  $close = explode(' - ', $times)[1];
  $close_formatted = date('Ymd', strtotime("next $day $close"));
  $close_formatted .= 'T'.date('His', strtotime("next $day $close")).'Z';
  return urlencode("$open_formatted/$close_formatted");
}
