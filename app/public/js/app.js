'use strict';

(function () {
	const configs = {
		// allRoutes: $$('section'),
		allRoutes: [],
	};

	const app = {
		init: function() {
			console.log("Initializing app");
			configs.allRoutes = helpers.getElements('section');
			routes.init();
		}
	};

	const routes = {
		init: function() {
			console.log('Initializing the routes');
			window.addEventListener('hashchange', function(e) {
				sections.toggle(helpers.getHash());
				// sections.toggle(e.newURL);
			});
		}
	}

	const sections = {
		toggle: function(route) {
			console.log('Change route');
			const currentId = helpers.shortenString(route, 1);

			// Need a better way
			// Will probably screw up with many routes
			for(let i = 0; configs.allRoutes.length > i; i++) {
				if (configs.allRoutes[i].id === currentId) {
					configs.allRoutes[i].classList.remove('inactive');
				} else {
					configs.allRoutes[i].classList.add('inactive');
				}
			}
		}
	}

	const helpers = {
		getHash: function() { return window.location.hash; },
		getElement: function(element) { return document.querySelector(element); },
		getElements: function(element) { return document.querySelectorAll(element); },
		// getAllRoutes: function () { return helpers.getElements('section') },
		shortenString: function(text, start, end) { return end ? text.substr(start, end) : text.substr(start); }
	}

	app.init();
})();