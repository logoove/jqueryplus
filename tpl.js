/**
js模板语法
支持for语句,for in
**/
var tpl=function(a,d){var c=function(l){var j,h=[],g=[];for(j in l){h.push(j);g.push(l[j])}return(new Function(h,c.$)).apply(l,g)};if(!c.$){var f=a.split("<%");c.$="var $=''";for(var b=0;b<f.length;b++){var e=f[b].split("%>");if(b!=0){c.$+="="==e[0].charAt(0)?"+("+e[0].substr(1)+")":";"+e[0].replace(/\r\n/g,"")+"$=$"}c.$+="+'"+e[e.length-1].replace(/\'/g,"\\'").replace(/\r\n/g,"\\n").replace(/\n/g,"\\n").replace(/\r/g,"\\n")+"'"}c.$+=";return $;"}return d?c(d):c};


