var wwlinin = window.location;
// var windowHttp = wwlinin.protocol == "https:" ? "https:" : "http:";
var windowHttp = "http:";

var wwlinHttp = {
    ie: $.browser != undefined && $.browser.msie && $.browser.version==6.0 ? true : false,
    wwlin : windowHttp + "wwlin.cn/",
    www : windowHttp + "www.wwlin.cn/"
}


$.extend(String.prototype,{
	'isPhone': function() {return Regular.call(this,/^(?:(?:1(?:3[4-9]|5[012789]|8[78])\d{8}|1(?:3[0-2]|5[56]|8[56])\d{8}|18[0-9]\d{8}|1[35]3\d{8})|14[57]\d{8}|170[059]\d{7}|17[13678]\d{8})$/);},
	'isMail': function() {return Regular.call(this,/^([_a-zA-Z\d\-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);},
	'isPassword': function() {return Regular.call(this,/^[a-zA-Z0-9_-]{6,18}$/);}, 
	'isName': function() {return Regular.call(this,/^[a-z0-9_-]{6,18}$/);},
	'isMoney': function() {return Regular.call(this,/^[1-9]\d*$/);},
	'isNull': function() {return $.trim(this) == "" ? false : true;},
	'isWeixin' :function (){return Regular.call(this,/^[a-zA-Z]{1}[a-zA-Z\d_-]{5,19}$/);}
});
$.extend({
	"cookie":function(name, value, options) {
	    if (typeof value != 'undefined') {
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString();
	        }
	        var path = options.path ? '; path=' + options.path : '';
	        var domain = options.domain ? '; domain=' + options.domain : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else {
	        var cookieValue = "";
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	},
	"isUrlPar":function(k,p){
		var u = p || window.location.search;
		var reg = new RegExp("(^|&)" + k + "=([^&]*)(&|$)", "i");
		var r = u.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]); return "";
	},

	"alert":function(t){
        var h = $('<div id="dAlert"><div>' + t + '</div></div>');
        h.appendTo("body");

        var _dAlertWith = $("#dAlert").width();
        $("#dAlert").css({
            "padding": "5px 20px",
            "backgroundColor" : "#999",
            "fontSize" : "14px",
            "position" : "absolute",
            "borderRadius": "6px",
            "left" : "50%",
            "marginLeft" : "-" + _dAlertWith / 2
        })
		h.dxlLayerFixedShow();
		h.fadeIn(300);
		setTimeout(function(){h.fadeOut(300,function(){h.remove();})},2000);
	},
	//环境初始化
	"mAppInit":function(opt){
		var par = {
			"appleWeixin":"",	//iphone微信
			"appleApp":"",		//iphoneApp
			"appleBrowser":"",	//iphone浏览器
			"iPadWeixin":"",	//ipad微信
			"iPadApp":"",		//ipadApp
			"iPadBrowser":"",	//ipad浏览器
			"androidWeixin":"",	//android微信
			"androidApp":"",	//androidApp
			"androidBrowser":"",//android浏览器
			"otherBrowser":""	//其它浏览器
		}
		$.extend(par,opt);
		var ua = window.navigator.userAgent.toLowerCase();
		//iphone
		if(navigator.userAgent.indexOf("iPhone") != "-1"){
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				$.isFunction(par.appleWeixin) ? par.appleWeixin() : "";
			}else if(navigator.userAgent.indexOf("dxlapp-iphone") != "-1"){
				$.dxlInclud(["dxlIos"],function(){$.isFunction(par.appleApp) ? par.appleApp() : "";});
			}else{
				$.isFunction(par.appleBrowser) ? par.appleBrowser() : "";
			}
		//ipad
		}else if(navigator.userAgent.indexOf("iPad") != "-1"){
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				$.isFunction(par.iPadWeixin) ? par.iPadWeixin() : "";
			}else if(navigator.userAgent.indexOf("dxlapp-ipad") != "-1"){
				$.dxlInclud(["dxlIos"],function(){$.isFunction(par.iPadApp) ? par.iPadApp() : "";});
			}else{
				$.isFunction(par.iPadBrowser) ? par.iPadBrowser() : "";
			}
		//android
		}else if(navigator.userAgent.indexOf("Android") != "-1"){
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				$.isFunction(par.androidWeixin) ? par.androidWeixin() : "";
			}else if(navigator.userAgent.indexOf("dxlapp-android") != "-1"){
				$.dxlInclud(["dxlAndroid"],function(){$.isFunction(par.androidApp) ? par.androidApp() : "";});
			}else{
				$.isFunction(par.androidBrowser) ? par.androidBrowser() : "";
			}
		//other
		}else{
			$.isFunction(par.otherBrowser) ? par.otherBrowser() : "";
		}
	}
});
$.fn.extend({
    "dxlLayerFixedShow":function(position){
		var _this = $(this);
		var _position = position;
		if (wwlinHttp.ie) {
			$(window).on("scroll.dxlsc",function(){_this._dxlLayerFixedShow(_position);});
		}
		$(window).on("resize.dxlsc",function(){_this._dxlLayerFixedShow(_position);}).resize();
	},
	"_dxlLayerFixedShow":function(position){
		var _this = $(this);
		var ie = wwlinHttp.ie;
		var def = {
			w:$(window).width()/2,
			h:($(window).height()/2) - 40,
			obj_w:_this.width()/2,
			obj_h:_this.height()/2,
			top:"auto",
			left:"auto",
			right:"auto",
			bottom:"auto"
		}
		if(_this.parent().css("position") == "relative"){
			var _thisRelative = _this.parent();
			if(ie){
				def.w = (_thisRelative.width()/2); 
			}else{
				def.w = _thisRelative.offset().left + (_thisRelative.width()/2);
			}
		}
		_this.css("position",ie ? "absolute" : "fixed");
		def.top = def.h - def.obj_h;
		def.top <= 0 ? def.top = 0 : "";
		def.left = def.w - def.obj_w;
		switch(position){
			case "top":def.top = 0;break
			case "left":def.left = 0;break
			case "right":def.left = "auto";def.right = 0;break
			case "bottom":def.top = "auto";def.bottom = 0;break
		}
		if(ie){
			if(position == "bottom"){
				def.bottom = "auto";
				def.top = ($(document).scrollTop() + $(window).height()) - _this.height();
			}else{def.top += $(document).scrollTop();}
		}
		_this.css({"left":def.left,"top":def.top,"right":def.right,"bottom":def.bottom});
		return _this;
	}
})

function Regular(z){return (new RegExp(z).test(this));}

