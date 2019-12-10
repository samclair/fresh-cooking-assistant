<?php

require_once './_api-keys.php';

if ($request['method'] === 'GET') {
  $name = $request['query']['name'];
  if (!isset($name)) { throw new ApiError('Location name required', 400); }
  $response['body'] = 'Did you ever hear the tragedy of Darth Plageuis the Wise?';
  send($response);
}
