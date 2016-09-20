/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-12-01
 */

;(function($) {
	
	function addEvent($target, options) {
		var template = '<div class="imagebox">' + 
			'<div class="content">' + 
			'<div class="closeButton"></div>' + 
			'<div class="prevButton ' + (options.direction) + '"></div>' +
			'<div class="nextButton ' + (options.direction) + '"></div>' +
			'<a href="" title="' + options.linkTitle + '" target="blank">' + 
			'<img src="data:image/gif;base64,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" />' + 
			'</a>' + 
			'</div>' +
			'<div class="translucent"></div>' +
			'</div>';
		
		$target.css('cursor', 'pointer').unbind('click').bind('click', function(e) {
			var curIndex = $target.index(this);
			console.log(curIndex);
			$('.imagebox').remove();
			$('body').append(template);
			$('.imagebox .closeButton, .imagebox .translucent, .imagebox a').click(function() {
				$('.imagebox').fadeOut('fast', function() {
					$(this).remove();
				});
			});
			$('.imagebox .prevButton').click(function() {
				curIndex = (curIndex - 1) % $target.length;
				showImage($target.eq(curIndex).attr('src'));
			});
			$('.imagebox .nextButton').click(function() {
				curIndex = (curIndex + 1) % $target.length;
				showImage($target.eq(curIndex).attr('src'));
			});
			if ($target.length > 1) {
				$('.imagebox .' + options.direction).show();
			}
			showImage($(this).attr('src'));
		});
	}
	
	function showImage(imageURL) {
		var maxWidth = $(window).width() * 0.8;
		var maxHeight = $(window).height() * 0.8;
		$('.imagebox a').attr('href', imageURL);
		$('.imagebox').fadeIn('fast');
		var image = new Image();
		image.src = imageURL;
		image.onload = function() {
			if ($('.imagebox').length == 0) return;
			var width = this.width;
			var height = this.height;
			if (width > maxWidth || height > maxHeight) {
				if (width / height > maxWidth / maxHeight) {
					height = height * maxWidth / width;
					width = maxWidth;
				} else {
					width = width * maxHeight / height;
					height = maxHeight;
				}
			}
			$('.imagebox .content').animate({
				marginLeft: width / -2 + 'px',
				marginTop: height / -2 + 'px', width: width,
				height: height
			}, 150);
			$('.imagebox img').attr('src', imageURL);
		};
	}
	
	$.fn.extend({
		imagebox: function(options) {
			options = $.extend({
				linkTitle: '点击查看原图', //图标链接提示
				direction: 'horizontal' //方向: horizontal / vertical
			}, options);
			
			var $img = $('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"], img[src$=".gif"]', this);
			addEvent($img, options);
			return this;
		}
	});
	
})(jQuery);