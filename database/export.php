<?php
require_once 'server/api/_config.php';
$user = $db_params['user'];
$database = $db_params['database'];
shell_exec("mysqldump -u $user -p $database > database/dump.sql");
