<?php
    include('./library/conn.php');

    class backType{}
    $back = new backType();
    $en_title = $_POST['en_title'];
    $cn_title = $_POST['cn_title'];
    $tags = $_POST['tags'];
    $intro = $_POST['intro'];
    $type = $_POST['type'];
    $variety = $_POST['variety'];
    $example = $_POST['example'];

    // formula
    // $select = "select * from `todolist` where `name` like '$name'";
    // $set = "update `todolist` set `list` = '$list' WHERE `todolist`.`name` = '$name'";

    // $add = "insert into `formula` (`id`, `en_title`, `cn_title`, `tags`, `intro`, `type`, `variety`, `example`) VALUES (NULL, 'test', 'test', '$tags', 'test', 'func', '$variety', 'test')";
    $add = "insert into `formula` (`id`, `en_title`, `cn_title`, `tags`, `intro`, `type`, `variety`, `example`) VALUES (NULL, '$en_title', '$cn_title', '$tags', '$intro', '$type', '$variety', '$example')";
    // $add = "insert into `formula` (`id`, `en_title`, `cn_title`, `tags`, `intro`, `type`, `variety`, `example`) VALUES (NULL, '$en_title', '$cn_title', '$tags', '$intro', '$type', '$variety', '$example')";

    // INSERT INTO `formula` (`id`, `en_title`, `cn_title`, `tags`, `intro`, `type`, `variety`, `example`) VALUES (NULL, 'Array.prototype.shift()', '头部删除', '[\"js\", \"array\", \"function\"]', '从数组前面移除一项，减少数组的length值', 'func', '[{\"remark\": \"改变原数组\", \"return\": \"被删除的元素\", \"argument\": []}]', 'const myFish = [\"angel\", \"clown\", \"mandarin\", \"surgeon\"];\r\n\r\nconsole.log(\"调用 shift 之前：\", myFish);\r\n// 调用 shift 之前： [\'angel\', \'clown\', \'mandarin\', \'surgeon\']\r\n\r\nconst shifted = myFish.shift();\r\n\r\nconsole.log(\"调用 shift 之后：\", myFish);\r\n// 调用 shift 之后： [\'clown\', \'mandarin\', \'surgeon\']\r\n\r\nconsole.log(\"被删除的元素：\" + shifted);\r\n// \"被删除的元素：angel\"');
    
    // $selected = $mysqli->query($select)->fetch_assoc();
    
    $result = $mysqli->query($add);
    $back->succeed = $result;

    // if($type === 'func'){
    //     // $result = $mysqli->query($set);
    //     // $back->succeed = $result;
    // }
    
    // if($type === 'stats'){
    //     // $result = $mysqli->query($add);
    //     // $back->succeed = $result;
    // }

    // echo $type;
    echo json_encode($result);
?>