<?php
    include('./library/conn.php');
    $sql = 'select * from `notes`';
   
    $result  = $mysqli->query($sql);
   
    $arr = array();		
    $num = $result->num_rows; //记录集的总条数   58
   
    for($i=0;$i<$num;$i++){
        $arr[$i] = $result->fetch_assoc();
    }
    echo json_encode($arr);
?>