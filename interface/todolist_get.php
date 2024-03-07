<?php
    include('./library/conn.php');

    define('LI',"list");
    $name = $_REQUEST['name'];
    $sql = "select * from `todolist` where `name` like '$name'";
    
    $result = $mysqli->query($sql)->fetch_assoc();
    
    class backType{}
    $back = new backType();
    if($result){
        $back->data = $result[LI];
        // $back->succeed = true;
    }else{
        // $back->succeed = false;
    }

    echo json_encode($result[LI]);
?>