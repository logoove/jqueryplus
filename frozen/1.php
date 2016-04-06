<?php

error_reporting(0);
header("Content-Type: text/html; charset=UTF-8");

function dump($arr){
	echo '<pre>'.print_r($arr,TRUE).'</pre>';
}


function cull_weixin($url){
$cookie = tempnam('./temp','cookie');
	$ch=curl_init($url);
	curl_setopt($ch, CURLOPT_REFERER,$url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143 MicroMessenger/6.3.9)');
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_COOKIEFILE, $cookie);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
$data  =  curl_exec($ch);
curl_close($ch);

preg_match('/<h2[\s\S]*?>([\s\S]*?)<\/h2>/',$data,$title);
$data = preg_replace('/<script[\s\S]*?<\/script>/i',"",$data);
$data = preg_replace('/<link[\s\S]*?>/i',"",$data);
preg_match('/<div class="rich_media_content " id="js_content">([\s\S]*?)<span id="readNum3"><\/span><\/div>/',$data,$content);
$title = $title[1];
$content = $content[0];
return array('title'=>$title,'content'=>$content);
}
$str1="https://mp.weixin.qq.com/s?__biz=MzA4MDQ0OTMxOA==&mid=207943756&idx=2&sn=8a65a8eea675bc0f9198a74119ab6531&scene=18&scene=1&srcid=0123poO7W1WsBNKirXwf3JkF&pass_ticket=PCPFcpDyBPEgjcP40juM6D%2FLDJ%2B%2BcgaPJVPmI9ojNCk%3D";
$str2 = "http://mp.weixin.qq.com/s?__biz=MzA4MDQzOTY1MQ==&mid=210502344&idx=1&sn=62f55b1857b626065aec094af22f63ac#rd";
dump(cull_weixin($str1));


?>