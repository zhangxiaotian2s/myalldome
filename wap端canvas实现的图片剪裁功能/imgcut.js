(function($) {
	$.fn.imgcut = function(mycfg) {
		var cfg = {
			filebtn: '#btn_file',
			canvas: '#imgcanvas',
			box: '#cut_content',
			canvasW: 500,
			canvasH: 500,
			imgsize: {
				w: '',
				h: ''
			},
			situation: {
				x: '',
				y: ''
			},
			windowsize: {
				w: '',
				h: ''
			}
		}
		$.extend(true, cfg, mycfg);
		var filebtn = $(cfg.filebtn),
			$canvas = $(cfg.canvas),
			canvas = $canvas[0];
		var ctx = canvas.getContext('2d');
         //判断终端
		var u = navigator.userAgent,
			app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		var initFn = {
			init: function() {
				cfg.windowsize.w = $(window).width();
				cfg.windowsize.h = $(window).height();
				$canvas.attr('width', cfg.windowsize.w);
				$canvas.attr('height', cfg.windowsize.h);
			},
			initBoxInStyle: function() {

			}
		}
		var CanvasFn = {
			//插入图片方法
			drawimg: function(imgsrc, s_x, s_y, w, h) {
				// polyfill 提供了这个方法用来获取设备的 pixel ratio
				if (imgsrc != undefined && imgsrc != '') {
					ctx.clearRect(0, 0, cfg.windowsize.w, cfg.windowsize.h)
					ctx.drawImage(imgsrc, s_x, s_y, w, h);
				}
			},
			//原生方法设置canvas 的宽高
			setCanvasSize: function() {
				canvas.setAttribute('width', cfg.canvasW);
				canvas.setAttribute('height', cfg.canvasH);
			},
		}
		var ImgFn = {
			//获取图片
			actionStart: function() {
				var _this = this;
				filebtn.bind('change', function(e) {
					(function(files) {
						for (var i = 0, f; f = files[i]; i++) {
							if (!f.type.match('image.*')) {
								continue;
							}
							var reader = new FileReader();
							reader.onload = (function(theFile) {
								return function(e) {
									//最终的入口
									//									  return e.target.result;
									_this.getImgSize(e.target.result)
								}
							})(f);
							reader.readAsDataURL(f);
						}
					})(e.target.files)
				})
			},
			getImgSize: function(imgsrc) {
				var _this = this;
				var _img = new Image();
				_img.src = imgsrc;
				_img.onload = function() {
					//添加进获得的图片的原始尺寸
					cfg.imgsize.w = _img.width;
					cfg.imgsize.h = _img.height;
					_this.setdrawSize()
					console.log(cfg.imgsize.h)
						//画布添加入图片
					CanvasFn.drawimg(_img, 0, 0, cfg.imgsize.w, cfg.imgsize.h)
				}
			},
			setdrawSize: function() {
				//为了保持图片不变形 这里要获取到图片的元吃尺寸比例~~~~高 : 宽比
				var _scale = cfg.imgsize.h / cfg.imgsize.w
					//此处是为了 获得图片缩放的尺寸		
				cfg.imgsize.w = cfg.imgsize.w > cfg.windowsize.w ? cfg.windowsize.w : cfg.imgsize.w;
				//并作取整 
				cfg.imgsize.h = Math.floor(cfg.imgsize.w * _scale)

			}

		}
		initFn.init()
		ImgFn.actionStart()
	}
})(Zepto)