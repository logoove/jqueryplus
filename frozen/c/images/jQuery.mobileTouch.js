// mobileTouch jQuery plug
;(function($){
	$.fn.extend({
		mobileTouch:function(opt){
			var defaults = {
				methods : [["down",1]],
				distance : 30,
				isPageScroll : false
			}
			opt = $.extend(defaults,opt);
			if(!opt.isPageScroll){
			$(this)[0].ontouchmove = function(){event.preventDefault();}
			}
			var fingerStartX,fingerStartY,fingerMoveX,fingerMoveY;
			function end(event){
				var x = fingerMoveX?fingerMoveX-fingerStartX:0;
				var y = fingerMoveY?fingerMoveY-fingerStartY:0;
				for(var p in opt.methods){
					switch(opt.methods[p][0].toUpperCase()){
						case "UP":
							if(y<-opt.distance&&opt.upCallBack&&opt.methods[p][1]==fingerNum)
							opt.upCallBack();
							break;
						case "DOWN":
							if(y>opt.distance&&opt.downCallBack&&opt.methods[p][1]==fingerNum)
							opt.downCallBack();
							break;
						case "LEFT":
							if(x<-opt.distance&&opt.leftCallBack&&opt.methods[p][1]==fingerNum)
							opt.leftCallBack();
							break;
						case "RIGHT":							
							if(x>opt.distance&&opt.rightCallBack&&opt.methods[p][1]==fingerNum)
							opt.rightCallBack();
							break;
					}	
				}
				
				fingerMoveX = null;
				fingerMoveY = null;
				
			}
			var fingerNum;
			function start(event){
				fingerNum = event.touches.length;
				fingerStartX = event.targetTouches[0].clientX;
				fingerStartY = event.targetTouches[0].clientY;
			}
			
			
			function move(event){
				fingerMoveX = event.targetTouches[0].clientX;
				fingerMoveY = event.targetTouches[0].clientY;
			}
			
			$(this)[0].addEventListener("touchend", end, false);
			$(this)[0].addEventListener("touchstart", start, false);
			$(this)[0].addEventListener("touchmove", move, false);
			
			return this;
		}	
	});
})(jQuery);
/*
$(function(){
	if(client.system.iphone||client.system.ipod||client.system.ipad||client.system.android){
			$("body").mobileTouch({
					isPageScroll:true,
					methods:[
						["left",1],
						["right",1]
					],
					leftCallBack:function(){
						$("#nav li.current").prev().find(".a").trigger("click");
					},
					rightCallBack:function(){
						$("#nav li.current").next().find(".a").trigger("click");
					}
			});
	}
	
})
*/