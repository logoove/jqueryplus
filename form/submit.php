<?php
$arr = $_POST;
$arr['msg']=1;
//echo $_POST['uname'];
echo json_encode($arr);
?>