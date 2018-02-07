// Object Literal pattern
(function () {
	var setting = {
	};

	var app = {
		init: function () {

		}
	}

	var position = {
		set: function () { },
		check: function () {
			var el = document.body;
			this.set();

			el.addEventListener('touchstart', function (el) {
				this.update();
			}).bind(this);
		},
		update: function () { },
		getDistance: function () { },
	}

	var gMap = {
		generate: function () { },
		update: function () { },
	}

	var helper = {
		isNumber: function () { },
		getElement: function (element) {
			return document.querySelector(element);
		},
		getElements: function () {
			return document.querySelectorAll(element);
		},
	}

	var debug = {

	}

	var $ = helper.getElement();
	var $$ = helper.getElements();

});