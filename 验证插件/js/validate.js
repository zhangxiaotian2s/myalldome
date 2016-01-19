function validate() {
	this.inputv = document.querySelectorAll('.validate_input');
	this.inputlenght = this.inputv.length;
	this.subbtn=document.getElementById('paysubmit')
	this.v_bool=false;
}
validate.prototype.getRule = function(i) {
	var self = this;
	var _rulestr = self.inputv[i].getAttribute('data-validate');
	if (_rulestr != null) {
		return _rulestr.split(",");
	}
}
validate.prototype.validate_init = function() {
	for (i = 0; i < this.inputlenght; i++) {
		this.validate_Set(i)
	}
}
validate.prototype.validate_Btn=function(){
	for (i = 0; i < this.inputlenght; i++) {
		this.inputv[i].focus();
		this.inputv[i].blur();
	}
	return this.v_bool
}

validate.prototype.validate_Set = function(i) {
	var self = this;
	var _rule = self.getRule(i);
	self.inputv[i].addEventListener('blur', function() {
		for (n = 0; n < _rule.length; n++) {
			if (!self.validate_Fn(_rule[n], self.inputv[i])) {
				return
			}
		}
	}, false)
	self.inputv[i].addEventListener('focus', function() {
		this.style.color = "#343434";
		if (this.getAttribute('data-error') != '') {
			this.value = '';
		}
	}, false)
}
validate.prototype.validate_Fn = function(rule, inputv) {
	var self= this
	var val = inputv.value;
	 var v_bool
	switch (rule) {
		case 'required':
			v_bool = validate_required();
			break;
		case 'phone':
			v_bool = validate_phone();
			break;
		case 'email':
			v_bool = validate_email();
			break;
	}
	self.v_bool=v_bool
	return v_bool;

	function validate_required() {
		if (val == '') {
			setErrorStyle(false, "不能为空")
			return false
		} else {
			setErrorStyle(true)
			return true
		}
	}

	function validate_email() {
		var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var _bool = _reg.test(val);
		setErrorStyle(_bool);
		return _bool;
	}

	function validate_phone() {
		var _reg = /^(1[0-9])\d{9}$/
		var _regnuber = /^\d+$/
		if (!_regnuber.test(val)) {
			setErrorStyle(false, '请输入正确的手机号')
			return false
		}
		var _bool = _reg.test(val);
		setErrorStyle(_bool);
		return _bool;
	}
	function setErrorStyle(bool, mes) {
		if (bool) {
			inputv.style.color = "#343434";
			inputv.setAttribute('data-error', '')
		} else {
			inputv.style.color = "#ff6666";
			if (mes) {
				inputv.value = mes
				inputv.setAttribute('data-error', mes)
			}
		}
	}
}
