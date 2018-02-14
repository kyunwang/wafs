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

		renderTemplate(element, template, directives = {}) { return Transparency.render(helpers.getElement(element), template, directives); }
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
		getOne: async function(route = '', searchText = '') {
			// Get the data based on the params given
			// const data = await fetch(`${this.baseUrl}/${route}??filter[slug]=${searchText}`, {
			const data = await fetch(`${this.baseUrl}/${route}??filter[id]=${searchText}`, {
				headers: this.baseHeader // Is required for the api
			})
			.then((res, err) => res.json())
			.catch(err => debug.error(err));

			console.log(data)
			return data;
		},
		/**
		 * 
		 * 
		 * @param {number} The  
		 * @param {string} 'anime' OR 'manga'
		 * @returns 
		 */
		getUserData: async function(userId = 182702, filterKind = 'anime') {
			const data = await fetch(`
			https://kitsu.io/api/edge/library-entries
			?
			fields[anime]=
			slug,
			posterImage,
			canonicalTitle,
			titles,
			synopsis,
			subtype,
			startDate,
			status,
			averageRating,
			popularityRank,
			ratingRank,
			episodeCount
			&filter[user_id]=${182702}
			&filter[kind]=${filterKind}
			&include=
			anime,
			user
			&page[offset]=0
			&page[limit]=100
			&sort=
			status,
			-progressed_at
			`)
			.then((res, err) => res.json())
			.catch(err => debug.error(err));

			console.log('Userdata: ', data);
			return data;
		},
		searchForUser: async function(userName = '') {
			const user = await fetch(`https://kitsu.io/api/edge/users?filter%5Bname%5D=${userName}`)
			.then((res, err) => res.json())
			.catch(err => debug.error(err));

			console.log('Search for user: ', user);
			// return user;
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

			let devAnime = helpers.getData('animeData');
			let devManga = helpers.getData('mangaData');
			// console.log((devAnime), (devManga))
			// // console.log(helpers.parse(devAnime), helpers.parse(devManga))
			// helpers.deleteData('animeData');

			console.log('Initializing app');
			let animeData, mangaData;

			// console.log(devAnime, devManga);
			// For dev purposes to prevent mass api calls
			if ((devAnime === null) ||
				(devAnime === 'undefined') ||
				(devManga === null) ||
				(devManga === 'undefined')) {
				console.log('No anime data so set');
				// Set our initial routes and animedata in a promise
				[configs.allRoutes, animeData, mangaData] = await Promise.all([
					helpers.getElements('.view'),
					api.get('anime', 20),
					api.get('manga', 20)
				]);
				helpers.setData('animeData', helpers.stringify(animeData));
				helpers.setData('mangaData', helpers.stringify(mangaData));
			} else {
				configs.allRoutes = helpers.getElements('.view');
			}




			// Setting our anime data in localstorage
			
			// Initialize our route
			routes.init();
		}
	};


	/*==========================
	=== Routing/Routes
	===========================*/
	
	const routes = {
		init() {
			this.routes(); // Well not really needed it feels like
		},
		routes() {
			routie({
				'home': function() {

					let devUser = helpers.getData('userData');
					let userData;


					// For local test purposes
					if ((devUser === null) || (devUser === 'undefined')) {
						userData = api.getUserData(182702);
						helpers.setData('userData', helpers.stringify());

						console.log('userData: ', userData);
					}

					console.log('Homepage', devUser);
					sections.toggle(this.path);

					var hello = {
						hello:      'Hello',
						goodbye:    '<i>Goodbye!</i>',
						greeting:   'Howdy!',
						// 'hi-label': 'Terve!' // Finnish i18n
					};

					helpers.renderTemplate('#home', hello);
				},
				'anime': function() {
					console.log('Anime overview');
					sections.toggle('overview');					

					const animeData = helpers.parse(helpers.getData('animeData'));

					const {
						overview,
						directives
					} = template.overview(animeData.data);
					
					// helpers.renderTemplate('#overview', overview, directives);
					helpers.renderTemplate('.items', overview, directives);
				},
				'anime/:slug': function(slug) {
					console.log('Anime slug: ', slug)
					sections.toggle('details');
					
					let singleAnime = helpers.parse(helpers.getData('animeData')).data
					.filter(item => item.attributes.slug === slug);

					console.dir(singleAnime[0]);

					const {
						overview,
						directives
					} = template.detail(singleAnime[0]);

					console.log('Anime slug', overview);
					// api.getOne('anime', slug);
					helpers.renderTemplate('.detail', overview, directives);
				},
				'manga': function() {
					console.log('Manga Overview');
					sections.toggle('overview');	

					const mangaData = helpers.parse(helpers.getData('mangaData'));

					const {
						overview,
						directives
					} = template.overview(mangaData.data);
					
					helpers.renderTemplate('.items', overview, directives);
				},
				'manga/:slug': function(slug) {
					console.log('Manga slug: ', slug);
					sections.toggle('details');

					let singleManga = helpers.parse(helpers.getData('mangaData')).data
					.filter(item => item.attributes.slug === slug);

					console.dir(singleManga[0]);

					const {
						overview,
						directives
					} = template.detail(singleManga[0]);
					
					helpers.renderTemplate('.detail', overview, directives);

				},
				'profile': function() {
					console.log('profile');
				},
			});
		}
	};



	/*==========================
	=== Our templates
	===========================*/
	const template = {
		overview(data) {
			// Return a template in a array for Transparency
			let overview = data.map(item => ({
				id: item.id,
				slug: item.attributes.slug,
				item__type: item.type,
				item__link: {
					item__name: item.attributes.canonicalTitle,
					item__image: '',
				},
				...item.attributes,
			}));

			let directives = {
				item__link: {
					// href: function() { return `#${this.item__type}/${this.id}` },
					href: function() { return `#${this.item__type}/${this.slug}` },
				},
				item__image: {
					src: function() {
						if (this.posterImage) {
							// console.log(this.posterImage.tiny)
							return this.posterImage.small;
						}
						// Return a default image
						// return 
					}
				}
			};

			return { overview, directives };
		},
		detail(data) {
			const {
				type,
				attr = data.attributes,
				rel = data.relationschips
			} = data;

			let overview = {
				item__name: attr.canonicalTitle,
				item__image: '',
				item__synopsis: attr.synopsis,
				item__rating: attr.averageRating,
				item__totalChOrEps: type === 'anime' ? attr.episodeCount : attr.chaperCount,
				...attr
			};

			let directives = {
				item__image: {
					src: function() {
						if (this.posterImage) {
							// console.log(this.posterImage.tiny)
							return this.posterImage.small;
						}
						// Return a default image
						// return 
					}
				}
			};

			return { overview, directives };
		}
		
	}

	const sections = {
		toggle(route) {
			console.log('Change route: ', route);
			// console.log(configs.allRoutes, route);

			configs.allRoutes.forEach(element => {
				if (element.id === route) {
					element.classList.remove('inactive');
				} else {
					element.classList.add('inactive');
				}
			});
		}
	};


	const storage = {
		getData() {},
		storeData() {}
	}

	// Initializing our app
	app.init();
})();