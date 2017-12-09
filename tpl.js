/**
js模板语法
支持for语句,for in
**/
var tpl=function(a,d){var c=function(l){var j,h=[],g=[];for(j in l){h.push(j);g.push(l[j])}return(new Function(h,c.$)).apply(l,g)};if(!c.$){var f=a.split("<%");c.$="var $=''";for(var b=0;b<f.length;b++){var e=f[b].split("%>");if(b!=0){c.$+="="==e[0].charAt(0)?"+("+e[0].substr(1)+")":";"+e[0].replace(/\r\n/g,"")+"$=$"}c.$+="+'"+e[e.length-1].replace(/\'/g,"\\'").replace(/\r\n/g,"\\n").replace(/\n/g,"\\n").replace(/\r/g,"\\n")+"'"}c.$+=";return $;"}return d?c(d):c};
/**
clipboard.min.js无需Flash复
*/
  function _bindCssEvent(events, callback) {
        var dom = this;
        function fireCallBack(e) {
            if (e.target !== this) {
                return;
            }
            callback.call(this, e);
            for (var i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (var i = 0; i < events.length; i++) {
                dom.on(events[i], fireCallBack);
            }
        }
    }
    $.fn.animationEnd = function(callback) {
        _bindCssEvent.call(this, [ "webkitAnimationEnd", "animationend" ], callback);
        return this;
    };
    $.fn.transitionEnd = function(callback) {
        _bindCssEvent.call(this, [ "webkitTransitionEnd", "transitionend" ], callback);
        return this;
    };
    $.fn.transition = function(duration) {
        if (typeof duration !== "string") {
            duration = duration + "ms";
        }
        for (var i = 0; i < this.length; i++) {
            var elStyle = this[i].style;
            elStyle.webkitTransitionDuration = elStyle.MozTransitionDuration = elStyle.transitionDuration = duration;
        }
        return this;
    };
    $.fn.transform = function(transform) {
        for (var i = 0; i < this.length; i++) {
            var elStyle = this[i].style;
            elStyle.webkitTransform = elStyle.MozTransform = elStyle.transform = transform;
        }
        return this;
    };

    var Notify = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.notify.defaults, options);
        var cls = this.options.type ? "msg-" + this.options.type : "msg-success";
        var $note = '<span class="msg ' + cls + '">' + this.options.message + "</span>";
        this.$element.html($note);
        return this;
    };
    Notify.prototype.show = function() {
        this.$element.addClass("in"), this.$element.append(this.$note);
        var autoClose = this.options.autoClose || true;
        if (autoClose) {
            var self = this;
            setTimeout(function() {
                self.close();
            }, this.options.delay || 2e3);
        }
    }, Notify.prototype.close = function() {
        var self = this;
        self.$element.removeClass("in").transitionEnd(function() {
            self.$element.empty();
            if (self.options.onClosed) {
                self.options.onClosed(self);
            }
        });
        if (self.options.onClose) {
            self.options.onClose(self);
        }
    }, $.fn.notify = function(options) {
        return new Notify(this, options);
    }, $.fn.notify.defaults = {
        type: "success",
        delay: 3e3,
        message: ""
    };
$.extend({
	        show: function(options) {
            if (options.url) {
                options.url = options.url.replace(/&amp;/gi, "&");
                options.onClose = function() {
                    redirect(options.url);
                };
            }
           notify = $.fn.notify(options), notify.show();
        },
        suc: function(msg, url, onClose, onClosed) {
            $.show({
                delay: 2e3,
                type: "success",
                message: msg,
                url: url,
                onClose: onClose,
                onClosed: onClosed
            });
        },
        err: function(msg, url, onClose, onClosed) {
            $.show({
                delay: 2e3,
                type: "error",
                message: msg,
                url: url,
                onClose: onClose,
                onClosed: onClosed
            });
        }
    })
