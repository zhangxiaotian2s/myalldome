//截取URL参数值
function getUrlParam(name) {
	var result = new RegExp('[\\?\&\#]' + name + '=([^\?\&\#]*)').exec(window.location.href);
	if (!result) {
		return 0;
	}
	return result[1] || 0;
};
(function($) {
	$.fn.ac_fix = function() {
		var 	strbtnid='.open_app_btn';
		var o_body = $('body'),
		url = $('#open_app').attr('data-open-app-url'),
		u = navigator.userAgent,
		ua = u.toLowerCase(),
		autolaunch = getUrlParam("autolaunch") || true,
		isweixin = ua.match(/MicroMessenger/i) == "micromessenger";
		var shareAPP = function() {
			this.fix_style = '<style type="text/css">*{padding: 0px;margin: 0px;}#fix_ts{ position: fixed; z-index: 1000001; top: 0px; width: 100%; }#fix_bk{ position: fixed;z-index: 1000000; height: 135%; top: 0px; width: 100%;  background: #000000;-webkit-opacity:0.7 ;-moz-opacity:0.7;opacity:0.7}</style>';
			this.fix_wx = '<div id="fix_bk"></div><div id="fix_ts" class="clearfix"><a href="javascript:void(0)"><img src="http://image.mastergolf.cn/share/open_in_browser.png" class="img-responsive" /></a></div>';
			this.open_url = url;
		}
		shareAPP.prototype = {
			insertFixWx: function() {
				o_body.append(this.fix_style);
				o_body.append(this.fix_wx);
			},
			openApp: function(url) {
					var _url = url || this.open_url;
				window.location.href = _url
				setTimeout(function() {
					window.location.href = 'http://app.mastergolf.cn/get?from=share'
				}, 2000);
				setTimeout(function() {
					window.location.reload();
				}, 3000);
			}
		}
		var shareapp = new shareAPP()
		if (isweixin) {
			$(document).bind('tap', strbtnid, function() {
				$('#cloud').removeClass('auto_scroll_left')
				shareapp.insertFixWx()

			})
			$(document).bind('tap', '#fix_bk,#fix_ts', function() {
				$('#fix_bk,#fix_ts').css({
					'-webkit-opacity':0,
					'-moz-opacity':0,
					'opacity':0
				})
				setTimeout(function(){
					$('#fix_bk,#fix_ts').remove()
					$('#cloud').addClass('auto_scroll_left')
				},500)
			})
		} else if(!autolaunch) {
			$(document).bind('tap', strbtnid, function() {
				var _url = $(this).attr('open_app_url');
				shareapp.openApp()
			})
		}else{
			shareapp.openApp()
		}
	}
})(Zepto);
$.fn.ac_fix();
