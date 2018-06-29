# jqueryplus
### jquery插件,layui类似bootstrap,功能也够用了,其余都是来补充这个的.
- city  一个省市县插件,可以展示省市,配合weui省市县非常棒;
- copy 不需要flash的复制插件
- jq-star 打星评分
- jqzoom 放大镜效果,淘宝看商品
- jscolor 颜色选择框
- validform 最好用的表单验证,使用非常容易
- php.js 用js写成的php函数,非常适合php开发使用,新增js模板函数tpl;
- layer 弹出层,功能超过,包括相册看图
- layui,类似bootstrap,包括了layer所有功能,更加强大
-swiper.js 轮播图3.4.2终极3版本<http://3.swiper.com.cn/api/index.html>
- slick 幻灯片插件 <http://www.dowebok.com/84.html>
- wow 页面滚动动画效果依赖animate.min.css,调用方法`new WOW().init();` 在div上加`class="wow slideInLeft"`

   配合data-wow-duration（动画持续时间）、data-wow-delay（动画延迟时间）、data-wow-offset（元素的位置露出后距离底部多少像素执行）和data-wow-iteration（动画执行次数）

~~~
wow rollIn 	从左到右、顺时针滚动、透明度从100%变化至设定值
  	 
wow bounceIn 	从原位置出现，由小变大超出设定值，再变小小于设定值，再回归设定值、透明度从100%变化至设定值

wow bounceInUp 	从下往上、窜上来以后会向上超出一部分然后弹回去、透明度为设定值不变

wow bounceInDown 	从上往下、掉下来以后会向下超出一部分然后弹跳一下、透明度为设定值不变

wow bounceInLeft 	从左往右、移过来以后会向右超出一部分然后往左弹一下、透明度为设定值不变

wow bounceInRight 	从右往左、移过来以后会向左超出一部分然后往右弹一下、透明度为设定值不变
  	 
wow slideInUp 	从下往上、上来后固定到设定位置、透明度为设定值不变（up是从下往上）（如果元素在最下面，会撑开盒子高度）

wow slideInDown 	从上往下、上来后固定到设定位置、透明度为设定值不变

wow slideInLeft 	从左往右、上来后固定到设定位置、透明度为设定值不变（left却是从左往右）
wow slideInRight 	从右往左、上来后固定到设定位置、透明度为设定值不变
  	 
wow lightSpeedIn 	从右往左、头部先向右倾斜，又向左倾斜，最后变为原来的形状、透明度从100%变化至设定值

wow pulse 	原位置放大一点点在缩小至原本大小、透明度为设定值不变（配合动画执行次数属性效果更佳）

wow flipInX 	原位置后仰前栽、透明度从100%变化至设定值

wow flipInY 	原位置左右旋动、透明度从100%变化至设定值

wow bounce 	上下抖动、透明度为设定值不变（配合动画执行次数和动画持续时间属性可以实现剧烈抖动亦或是慢慢抖）

wow shake 	左右抖动、透明度为设定值不变（配合动画执行次数和动画持续时间属性可以实现剧烈抖动亦或是慢慢抖）

wow swing 	从右往左、头部先向右倾斜，又向左倾斜，最后变为原来的形状、透明度为设定值不变

wow bounceInU 	原位置不变、直接从不显示到显示（无过过渡效果）

wow wobble 	原位置不变、类似于一个人站在那左右晃头、透明度为设定值不变

~~~

-  top 返回顶部

 `<a class="to-top">返回顶部</a> $('.to-top').toTop();`

~~~
autohide 	布尔值 	true 	自动隐藏
offset 	整数 	420 	距离顶部多少距离时自动隐藏按钮
speed 	整数 	500 	滚动持续时间
position 	布尔值 	true 	如果设置为 false，则需要手动在 css 中设置“按钮”的位置
right 	整数 	15 	右侧距离
bottom 	整数 	30 	底部距离
~~~


- thumb 缩略图插件 解决不同大小图片

` $('img').jqthumb();`

~~~
classname 		‘jqthumb’ 	缩略图容器的 class
width 	整数 	100 	缩略图的宽度，单位为 px
height 	整数 	100 	缩略图的高度，单位为 px
position 		{top:’50%’, left:’50%’} 	缩略图的位置，默认为 50%，即水平并且垂直居中
source 	字符串 	‘src’ 	指定图像源属性，默认为 src
showoncomplete 	布尔值 	true 	处理后时候立即显示，如果为 false 则不自动显示，需要额外设置让它显示，比如使用回调函数 after、done
before 	函数 		处理前的回调函数
after 	函数 		某一个图片处理后的回调函数
done 	函数 		所有图片处理后的回调函数
~~~

