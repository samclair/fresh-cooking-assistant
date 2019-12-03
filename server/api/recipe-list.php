<?php

require_once '_api-keys.php';
require_once '_helpers.php';

if ($request['method'] === 'GET') {
  $tags = $request['query']['tags'];
  $sizes = intval($request['query']['sizes']);
  if (!isset($tags)) { throw new ApiError("Search tag required", 400); }
  if (!isset($sizes) || $sizes < 0) { $sizes = 1; }
}
