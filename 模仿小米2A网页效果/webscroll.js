function verticalScoll() {
	this.section = $('.sectionone');
	this.sectionbox = $('#sectionbox');
	this.body = $('body');
	this.sectionwrap = $('#sectionwrap');
	this.nowi = 0;
	this.sectionlength = this.section.length;
	this.fixedol=$("#fixed_ol")
	this.fixedli=$('#fixed_ol li')
}
var scollProto = verticalScoll.prototype
scollProto.init = function() {
	var self = this;
	self.w_w = $(document).width();
	self.w_h = $(document).height();
	//初始设置各项的高度尺寸
	self.setInit();
	//鼠标滚动判断逻辑
	self.scollAction()
}
scollProto.setInit = function() {
	var self = this;
	self.section.css({
		'height': self.w_h
	})
	self.body.css({
		'height': self.w_h
	})
	self.sectionbox.css({
		'height': self.w_h
	})
}
scollProto.scollAction = function() {
	var self = this;
	var i = 0
	self.body.on('mousewheel  DOMMouseScroll', function(e) {
		i++
		if (i < 7) {
			return
		}
		var deltay = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? -1 : 1)) || // chrome & ie
			(e.originalEvent.detail && (e.originalEvent.detail > 0 ? 1 : -1));
		console.log(deltay)
		if (deltay > 0) {
			self.nowi++
		} else if (deltay < 0) {
			self.nowi--
		}
		self.computeNowi()
		self.scollTapFn(self.nowi)
		self.tapFixedOl(self.nowi)
		i = 0
	})
}
scollProto.computeNowi = function() {
	if (this.nowi > this.sectionlength - 1) {
		this.nowi = this.sectionlength - 1
	} else if (this.nowi < 0) {
		this.nowi = 0
	}
}
scollProto.tapFixedOl=function(i){
	this.fixedli.eq(i).addClass('current').siblings().removeClass('current')
	
}
scollProto.scollTapFn = function(i) {
	var self = this;
	var _offsetY = -(i * self.w_h) + 'px';
	self.sectionwrap.css({
		'-webkit-transition': 'all 1000ms ease',
		'-moz-transition': 'all 1000ms ease',
		'-o-transition': 'all 1000ms ease',
		'transition': 'all 1000ms ease'
	})
	self.sectionwrap.css({
		'-webkit-transform': 'translate3d(0px,' + _offsetY + ', 0px)',
		'-moz-transform': 'translate3d(0px, ' + _offsetY + ', 0px)',
		'-o-transform': 'translate3d(0px, ' + _offsetY + ', 0px)',
		'transform': 'translate3d(0px, ' + _offsetY + ', 0px)'
	})
}





var v = new verticalScoll()
v.init()