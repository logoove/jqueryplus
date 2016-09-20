# 图片查看弹出框,相册

## 参数

linkTitle: 点击图片提示信息，默认为 '点击查看原图'  

direction: 箭头显示方向，水平方向 (horizontal) 和垂直方向 (vertical)，默认为 'horizontal'

## 如何使用

1、导入

```
<link rel="stylesheet" href="css/jquery.imagebox.css" />
<script type="text/javascript" src="js/jquery.imagebox.js"></script>
```

2、使用

```
单图
<a  id='id1' href="javascript:;"><img width="100" height="50" src="1.jpg"></a>
$('#id1').imagebox();
相册
<a  id='id2' href="javascript:;"><img width="100" height="50" src="1.jpg"><img width="100" height="50" src="1.jpg"></a>
$('#id2').imagebox();
参数,多图有效
<a  id='id3' href="javascript:;"><img width="100" height="50" src="1.jpg"><img width="100" height="50" src="1.jpg"></a>
$('#id3').imagebox({
    linkTitle: '查看原图',
    direction: 'vertical' //默认是水平左右箭头,这里是垂直
});
```
3. 本插件依赖jquery库,本人添加上了演示,修复了一些错误.
