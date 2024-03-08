<?php
    header('content-type:text/html;charser=utf-8');
    header('Access-Control-Allow-Origin:*');
    

    $mysql_conf = array(
        'host' => 'localhost:3306',
        'db_user' => 'root',
        'db_pass' => '123456',
        'db' => '20240304_myblog'
        // 'db' => '20240304_myblog'
    );

    $mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pass']);
    if ($mysqli->connect_errrno) {
        die('链接错误' . $mysqli->connect_errrno);
    };

    $mysqli->query('set names utf8');

    $select_db = $mysqli->select_db($mysql_conf['db']);

    if (!$select_db) {
        die('数据库错误' . $mysqli->connect_errrno);
    };
?>