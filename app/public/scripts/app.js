'use strict';

(function () {
	const configs = {
		// allRoutes: $$('section'),
		allRoutes: [],
	};

	const app = {
		init: async function() {
			console.log('Initializing app');
			let initialData;

			// Set our initial routes and animedata in a promise
			[configs.allRoutes, initialData] = await Promise.all([
				helpers.getElements('section'),
				api.get('anime', 20)
			]);

			routes.init();


			// api.getAnime(20);
			// api.get('anime', 20);
			// Setting our anime data in localstorage
			helpers.setData('animeData', helpers.stringify(initialData));
			console.log(helpers.getData('animeData'))
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

	// Max limit for the api is 20
	const api = {
		baseUrl: 'https://kitsu.io/api/edge',
		baseHeader: {
			'Accept': 'application/vnd.api+json',
			'Content-Type': 'application/vnd.api+json'
		},
		get: async function(route = '', limit = 10, offset = 0) {
			const data = await fetch(`${this.baseUrl}/${route}?page[limit]=${limit}&page[offset]=${offset}`, {
				headers: this.baseHeader
			})
			.then((res, err) => res.json())
			.catch(err => debug.error(err));

			console.log(data)
			return data;
		},

		getAnime: async function(limit = 10, offset = 0) {
			const data = await fetch(`${this.baseUrl}/anime?page[limit]=${limit}&page[offset]=${offset}`, {
				headers: this.baseHeader
			})
			.then((res, err) => res.json())
			.then((res, err) => {
				helpers.setData('animeData', helpers.stringify(res));
				console.log(res.data.length)
				return res;
			})
			.catch(err => debug.error(err));

			return data;
		}
	}

	const storage = {
		getData() {},
		storeData() {}
	}

	const helpers = {
		getHash() { return location.hash; },
		getElement(element) { return document.querySelector(element); },
		getElements(element) { return document.querySelectorAll(element); },
		// getAllRoutes () { return helpers.getElements('section') },
		shortenString(text, start, end) { return end ? text.substr(start, end) : text.substr(start); },
		setData(key, data) { return localStorage.setItem(key, data); },
		getData(key) { return localStorage.getItem(key); },
		deleteData(key) { return localStorage.removeItem(key); },
		stringify(data) { return JSON.stringify(data); },
		parse(data) { return JSON.parse(data); },
	};

	const debug = {
		error(err) { console.log('Oops a error: ', err); return err; }
	}

	app.init();
})();