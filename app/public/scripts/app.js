'use strict';

(function () {
	const configs = {
		// allRoutes: $$('section'),
		allRoutes: [],
	};

	const app = {
		init: async function() {
			console.log("Initializing app");
			configs.allRoutes = await helpers.getElements('section'); // Needs a better way for scalability (screen/route class?)
			routes.init();
		}
	};

	const routes = {
		init() {
			const getHash = helpers.getHash();
			console.log('Initializing the routes');
			if (getHash.length) {
				sections.toggle(getHash);
			}
			
			window.addEventListener('hashchange', function(e) {
				sections.toggle(helpers.getHash());
			});
		}
	};

	const sections = {
		toggle(route) {
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
			};
		}
	};

	const api = {
		baseUrl: 'https://kitsu.io/api/edge',
		get: {
			// return fetch()
		}
	}

	const helpers = {
		getHash() { return location.hash; },
		getElement(element) { return document.querySelector(element); },
		getElements(element) { return document.querySelectorAll(element); },
		// getAllRoutes () { return helpers.getElements('section') },
		shortenString(text, start, end) { return end ? text.substr(start, end) : text.substr(start); }
	};

	app.init();
})();