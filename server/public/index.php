<?php

require_once '../api/_lifecycle.php';
switch ($request['path']) {
  case '/api/health-check':
  case '/api/produce-details':
  case '/api/produce-in-season':
    require_once "..${request['path']}.php";
  default:
    throw new ApiError("Cannot ${request['method']} ${request['path']}", 404);
}
