'use strict';

(function () {
	/*==========================
	=== All the configs/helpers ect. first
	===========================*/
	const configs = {
		allRoutes: [],
	};

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

		renderTemplate(id, template) { return Transparency.render(helpers.getElement(`#${id}`), template); }
	};

	const debug = {
		error(err) { console.log('Oops a error: ', err); return err; }
	}



	/*==========================
	=== Api
	===========================*/
	const api = {
		animeData: helpers.getData('animeData'),
		baseUrl: 'https://kitsu.io/api/edge',
		baseHeader: {
			'Accept': 'application/vnd.api+json',
			'Content-Type': 'application/vnd.api+json'
		},
		// Max limit for the api is 20
		get: async function(route = '', limit = 10, offset = 0) {

			// Get the data based on the params given
			const data = await fetch(`${this.baseUrl}/${route}?page[limit]=${limit}&page[offset]=${offset}`, {
				headers: this.baseHeader // Is required for the api
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


	/*==========================
	=== Application and Routes
	===========================*/
	const app = {
		init: async function() {
			helpers.deleteData('animeData');

			console.log('Initializing app');
			let initialData;

			// Set our initial routes and animedata in a promise
			[configs.allRoutes, initialData] = await Promise.all([
				helpers.getElements('section'),
				api.get('anime', 20)
			]);

			// Setting our anime data in localstorage
			helpers.setData('animeData', helpers.stringify(initialData));

			routes.init();
		}
	};

	const routes = {
		init() {
			this.routes();
		},
		routes() {
			routie({
				'home': function() {

					var hello = {
						hello:      'Hello',
						goodbye:    '<i>Goodbye!</i>',
						greeting:   'Howdy!',
						// 'hi-label': 'Terve!' // Finnish i18n
						};

					console.log('home');

					helpers.renderTemplate('home', hello);
				},
				'anime': function() {
					const animeData = helpers.parse(helpers.getData('animeData'));

					// Return a template in a array for Transparency
					let overview = animeData.data.map(item => ({
						item__name: item.attributes.canonicalTitle
					}))
					
					console.log('anime', animeData, overview);
					// Transparency.render('overview', overview);
					helpers.renderTemplate('overview', overview);
				},
				'anime/:slug': function(slug) {
					console.log('anime, ', slug);
				},
				'manga': function() {
					console.log('manga');
				},
				'profile': function() {
					console.log('profile');
				},
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


	const storage = {
		getData() {},
		storeData() {}
	}

	app.init();
})();