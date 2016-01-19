var loadimg = function() {
	this.img = document.querySelectorAll(".loadimg");
	this.w_h = window.screen.height;
	this.datasrc = 'data-src';
}
loadimg.prototype.scrolladd = function() {
	var _s_t = document.body.scrollTop,
		_img_t = _s_t + this.w_h + 200,
		_l = this.img.length;
	for (i = 0; i < _l; i++) {
		var _this = this.img[i],
			_datasrc = _this.getAttribute(this.datasrc),
			_nowsrc = _this.getAttribute('src'),
			_offtop = _this.offsetTop;
		if (_datasrc != _nowsrc && _img_t > _offtop) {
			_this.setAttribute('src', _datasrc);
		}
	}
}
window.onload = function() {
	var loadnow = new loadimg();
	loadnow.scrolladd();
	document.body.ontouchmove = function() {
		loadnow.scrolladd();
	}
	window.onscroll = function() {
		loadnow.scrolladd();
	}
}