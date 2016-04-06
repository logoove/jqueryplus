<?php
$data = $_POST['base64'];
preg_match("/data:image\/(.*);base64,/",$data,$res);
$ext = $res[1];
if(!in_array($ext,array("jpg","jpeg","png","gif"))){
	echo json_encode(array("error"=>1));die;
}
$file=time().'.'.$ext;
$data = preg_replace("/data:image\/(.*);base64,/","",$data);
//http://weixin10-weiqinpicture.stor.sinaapp.com///2015/06/uz9rL9uY9nt8791tUUDdDn0y37AT98.jpg

if (file_put_contents("saestor://"."weiqinpicture/".$file,base64_decode($data))===false) {
	echo json_encode(array("error"=>1));
}else{
	echo json_encode(array('src'=>"http://weixin10-weiqinpicture.stor.sinaapp.com/".$file."?".time(),'size'=>$_POST['size'],"error"=>0));
}