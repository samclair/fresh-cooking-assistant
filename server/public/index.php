<?php

require_once '../api/_lifecycle.php';
switch ($request['path']) {
  case '/api/log-in':
  case '/api/seasons':
  case '/api/maps-list':
  case '/api/fresh-list':
  case '/api/recipe-list':
  case '/api/maps-details':
  case '/api/health-check':
  case '/api/maps-calendar':
  case '/api/random-produce':
  case '/api/recipe-details':
  case '/api/produce-details':
  case '/api/favorite-recipes':
  case '/api/produce-in-season':
    require_once "..${request['path']}.php";
  default:
    throw new ApiError("Cannot ${request['method']} ${request['path']}", 404);
}
