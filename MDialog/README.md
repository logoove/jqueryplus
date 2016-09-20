# MDialog.js

寻求简单，精简的网页对话框，专注于友好的接口，千里之行，始于足下。

## Demo参考

<http://demo.webjyh.com/MDialog/>

## Update Ver 2.2.0 (2014-11-30)
1. 修复 button 方法直接传入 html 不显示的问题
2. 修复 $M().Msg() 方法下 下样式问题

## Update Ver 2.1.1 (2014-11-04)
1. 修正 jQuery ui Dialog 样式冲突的问题
2. 修复锁屏高度计算出错问题

## Update Ver 2.1 (2014-10-30)
此版本增加了 iframe 载入事件 和 数据相互之间传递，及一些弹窗细节修改

1. 增加 iframe 载入完成后的事件 oniframeload 详情参考API oniframeload 参数
2. 增加 MDialog 数据之间传递功能 data 参数 详情参考API data 参数
3. 修改 弹窗弹出 CSS3 动画
4. 修正 iframe Loading 界面样式出错问题

## Update Ver 2.0  (2014-10-09)
此版本增加了 iframe 框架功能，及一些弹窗细节修改

1. 增加了弹窗的最小宽和高度
2. 增加了气泡对话框简洁方法 $M().msg( content ); 详情参考API msg() 方法
3. 增强引用 iframe 框架功能，在不跨域情况下，弹窗宽高自适应，如有设定宽高，按设定的来
4. 增加 $M.getIframe(window.name) 方法 用于获取当前 iframe 的弹窗对象 详情参见API iframe 参数
5. iframe 具体用法可参考 Demo 案例中的 iframe.html 页面
6. 增加 iframe loading 交互
7. 废除了$M.iframe() 的方法
8. 增强了 $M.content() 方法的健壮性，支持 HTMLElement

## Update Ver 1.1  (2014-07-22)

1. 增加 untitle, unclose, iframe 配置参数
2. 增加 untitle( Boolean ), iframe( URL ) 方法
3. 支持 AMD的方式 加载  如 require.js
4. 修正若干 Bug
5. 新增加的配置参数和方法，请到Demo页查看具体使用方法

## 如何使用插件

```html
1.务必使用正确的 HTML 文档申明 如：
XHTML 申明 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
或者
HTML5 申明 <!DOCTYPE HTML>

2.引入文件
<link rel="stylesheet" href="MDialog.css">
<script type="text/javascript" src="MDialog.js"></script>
```

## 初始化对话框

```javascript
$M({
    title: 'MDialog',
    content:'<p>欢迎使用 MDialog 对话框！</p>'
});
```

更多用法请参考 Demo 页。

## 程序说明

1. 本人也是在学习 JavaScript ，程序在使用时避免不了出现意外的Bug和缺少功能。
2. 在使用前，请认真阅读插件文档。
3. 如本插件有幸应用到你的项目中，谢谢你的支持。
4. 程序兼容性: 理论兼容IE6+，Google Chrome, FireFox，但在IE6下难免会出意料之外的Bug。
5. 意见反馈: 如有一些使用问题或者插件的Bug，请到 我的博客 里联系我

## 联系作者

Blog：<http://webjyh.com> 
Weibo：<http://weibo.com/webjyh/>
