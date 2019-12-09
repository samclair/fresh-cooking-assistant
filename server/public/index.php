<?php

require_once '../api/_lifecycle.php';
switch ($request['path']) {
  case '/api/log-in':
  case '/api/seasons':
  case '/api/fresh-list':
  case '/api/recipe-list':
  case '/api/health-check':
  case '/api/random-produce':
  case '/api/recipe-details':
  case '/api/produce-details':
  case '/api/favorite-recipes':
  case '/api/produce-in-season':
  case '/api/maps':
    require_once "..${request['path']}.php";
  default:
    throw new ApiError("Cannot ${request['method']} ${request['path']}", 404);
}
