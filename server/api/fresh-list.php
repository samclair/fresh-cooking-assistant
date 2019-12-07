<?php

if($request['method'] === 'GET'){
  get_all_list_items();
}

if ($request['method'] === 'POST') {
  add_list_item();
}

if ($request['method'] === 'DELETE') {
  delete_list_item();
}

if ($request['method'] === 'PATCH') {
  edit_list_item();
}

function get_all_list_items(){
  return;
}

function add_list_item(){
  return;
}

function delete_list_item(){
  return;
}

function edit_list_item(){
  return;
}
