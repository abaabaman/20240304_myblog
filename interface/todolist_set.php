<?php
    include('./library/conn.php');

    // class backType{}
    // $back = new backType();
    $name = $_POST['name'];
    $list = $_POST['list'];

    $select = "select * from `todolist` where `name` like '$name'";
    $set = "update `todolist` set `list` = '$list' WHERE `todolist`.`name` = '$name'";
    $add = "insert into `todolist` (`id`, `name`, `list`) VALUES (NULL, '$name', '$list')";
    
    $selected = $mysqli->query($select)->fetch_assoc();
    
    if($selected){
        $result = $mysqli->query($set);
        // $back->succeed = $result;
    }else{
        $result = $mysqli->query($add);
        // $back->succeed = $result;
    }

    echo json_encode($result);
?>