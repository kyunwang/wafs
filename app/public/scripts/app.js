'use strict';

(function () {
	/*==========================
	=== All the configs/helpers ect. first
	===========================*/
	const configs = {
		allRoutes: [],
		searchUserInput: '',
		searchUserBtn: '',
		// searchUserForm: '',
		showUserManga: '',
		showUserAnime: '',
		userId: '',
		activeFilter: 'anime'
	};

	const helpers = {
		getHash() { return location.hash; },
		getElement(element) { return document.querySelector(element); },
		getElements(element) { return document.querySelectorAll(element); },
		// getAllRoutes () { return helpers.getElements('section') },
		shortenString(text, start, end) { return end ? text.substr(start, end) : text.substr(start); },
		toInt(item) { return parseInt(item, 10) },
		
		stringify(data) { return JSON.stringify(data); },
		parse(data) { return JSON.parse(data); },
		setData(key, data) { return localStorage.setItem(key, this.stringify(data)); },
		getData(key) { return this.parse(localStorage.getItem(key)); },
		deleteData(key) { return localStorage.removeItem(key); },

		renderTemplate(element, template, directives = {}) { return Transparency.render(helpers.getElement(element), template, directives); }
		// renderTemplate(element, template, directives = {}) {
 		// 	return new Promise(function(resolve, reject) {
		// 		 Transparency.render(helpers.getElement(element), template, directives);
		// 		 resolve('a wrapper');
		// 	 });
		// }
	};

	const debug = {
		error(err) { console.log('Oops a error: ', err); return err; }
	}

	const storage = {
		animeData: [],
		mangaData: [],
		userData: [],
		userDataAnime: [],
		userDataManga: [],
	}

	/*==========================
	=== Api
	===========================*/
	const api = {
		// animeData: helpers.getData('animeData'),
		baseUrl: 'https://kitsu.io/api/edge',
		baseHeader: {
			'Accept': 'application/vnd.api+json',
			'Content-Type': 'application/vnd.api+json'
		},
		// Max limit for the api is 20
		get: async function(route = '', limit = 10, offset = 0) {
			// Get the data based on the params given
			return await fetch(`${this.baseUrl}/${route}?page[limit]=${limit}&page[offset]=${offset}`, {
				headers: this.baseHeader // Is required for the api
			})
			.then((res, err) => res.json())
			.catch(err => debug.error(err));
		},
		searchForUser: async function(userName = '') {
			return await fetch(`https://kitsu.io/api/edge/users?filter%5Bname%5D=${userName}`, {
				headers: this.baseHeader // Is required for the api
			})
			.then((res, err) => res.json())
			.catch(err => debug.error(err));
		},
		/**
		 * 
		 * @param {number} The userId
		 * @param {string} 'anime' OR 'manga'
		 * @returns 
		 */
		getUserData: async function(userId = 182702, kind = 'anime', limit = 20) {
			return await fetch(`
				https://kitsu.io/api/edge/library-entries
				?
				fields[${kind || 'anime'}]=
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
				&filter[user_id]=${userId || 182702}
				&filter[kind]=${kind || 'anime'}
				&include=
				${kind || 'anime'},
				user
				&page[offset]=0
				&page[limit]=${limit || 20}
				&sort=
				status
			`, {
				headers: this.baseHeader // Is required for the api
			})
			// -progressed_at
			.then((res, err) => res.json())
			.catch(err => debug.error(err));
		},
		getUserDataFilter: async function(userId = 182702, kind = 'anime', status = 'current', limit = 20, offset = 0) {
			return await fetch(`
				https://kitsu.io/api/edge/library-entries
				?
				fields[${kind || 'anime'}]=
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
				&filter[user_id]=${userId || 182702}
				&filter[kind]=${kind || 'anime'}
				&filter[status]=${status || 'current'}				
				&include=
				${kind || 'anime'},
				user
				&page[offset]=0
				&page[limit]=${limit || 20}
				&page[offset]=${offset || 0}
				&sort=
				status
			`, {
				headers: this.baseHeader // Is required for the api
			})
			.then((res, err) => res.json())
			.catch(err => debug.error(err));
		},
	}



	/*==========================
	=== Events
	===========================*/
	const events = {
		init() {
			const {
				searchUserBtn,
				searchUserInput,
			} = configs;
			
			searchUserBtn.addEventListener('click', async(e) => {
				e.preventDefault();

				const user = await api.searchForUser(searchUserInput.value);				

				// If there is any data found of the user. Get his data
				if (user.data.length) {
					const userData = await api.getUserData(user.data[0].id, null, 40);
					
					configs.userId = user.data[0].id;

					// Save the user id to localstorage for filter usage ect.
					helpers.setData('userId', user.data[0].id);

					// Save the data in localstorage
					helpers.setData('userData', userData);

					const { overview, directives
					} = template.userOverview(userData);
					
					helpers.renderTemplate('.view__home', overview, directives);
					// // helpers.renderTemplate('.view__home', overview, directives)
						// .then(() => {
						// // helpers.getElement('#user-view').classList.add('user__view--active');
					// })

				} else {
					// Return a message for the user
					// Need to get a template ready or message thingy
					const { overview } =
					template.noStuff(`We cannot find ${searchUserInput.value}`);

					helpers.renderTemplate('.view__home', overview);
				}
			});
		},
	}

	/*==========================
	=== Application and Routes
	===========================*/
	const app = {
		init: async function() {
			console.log('Initializing app');

			// We check the existence of the data first 
			let devAnime = helpers.getData('animeData');
			let devManga = helpers.getData('mangaData');
			// helpers.deleteData('animeData');
			let animeData, mangaData;

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
					helpers.setData('animeData', animeData);
					helpers.setData('mangaData', mangaData);

					// Store the data in our temporary storage
					storage.animeData = animeData;
					storage.mangaData = mangaData;
				} else {
					// Store the data in our temporary storage
					storage.animeData = devAnime;
					storage.mangaData = devManga;
				}
			
			// Getting and setting our elements here for later
			// Need a better way or is this the way?
			[
				configs.allRoutes, // Yes we set it again just to be sure for dev
				configs.searchUserInput,
				configs.searchUserBtn,
			] = await Promise.all([
				helpers.getElements('.view'),
				helpers.getElement('#search-user-input'),
				helpers.getElement('#search-user-btn'),
			]);
			
			
			// Initiate our events (clicks ect.)
			events.init();

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

			// Redirect to the homepage/template when there no hash is active
			if (!location.hash) { routie('library'); }
		},
		routes() {
			routie({
				'library': async function() {
					console.log('Homepage', storage);
					
					sections.toggle(this.path);

					let devUser = helpers.getData('userData');

					// If there is data in the localstorage
					// return and wait till the user has searched for his/her account
					if ((devUser === null) || (devUser === 'undefined') || (devUser.errors)) {
						return;
					} else {
						// Set data into temporary local data
						storage.userDataAnime = devUser;

						const { overview, directives
						} = template.userOverview(storage.userDataAnime);
	
						helpers.renderTemplate('.view__home', overview, directives);
					}

				},
				'library/manga': async function() {
					console.log('Library Manga', storage);
					

					const userData = await api.getUserData((configs.userId || 182702), 'manga', 40);

					// Set data into temporary local data
					storage.userDataManga = userData;

					const { overview, directives
					} = template.userOverview(userData, 'manga');
					
					helpers.renderTemplate('.view__home', overview, directives);
				},
				'library/:query': function(query) {
					console.log('Library query: ', query);
					const userId = configs.userId || helpers.getData('userId');

					api.getUserDataFilter(userId, 'anime', query, 20, 1)
						.then(res => storage.userDataAnime = res)
						.then(res => {
							const { overview, directives
							} = template.userOverview(storage.userDataAnime);

							console.log(res);
							
							helpers.renderTemplate('.view__home', overview, directives);				
						});


				},
				'library/manga/:query': function(query) {
					console.log('Library query Manga: ', query);
					const userId = configs.userId || helpers.getData('userId');

					api.getUserDataFilter(userId, 'manga', query, 20, 1)
						.then(res => storage.userDataManga = res)
						.then(res => {
							const { overview, directives
							} = template.userOverview(storage.userDataManga, 'manga');

							console.log(res);
							
							helpers.renderTemplate('.view__home', overview, directives);				
						});
				},
				'anime': function() {
					console.log('Anime overview');
					sections.toggle('overview'); // Toggle to ...				

					const animeData = helpers.getData('animeData');

					const { overview, directives
					} = template.overview(animeData.data);

					
					// helpers.renderTemplate('#overview', overview, directives);
					helpers.renderTemplate('.view__overview .items', overview, directives);
				},
				'anime/:slug': function(slug) {
					console.log('Anime slug: ', slug);
					sections.toggle('details'); // Toggle to ...
					
					let singleAnime = helpers.getData('animeData').data
					.filter(item => item.attributes.slug === slug);

					// Want a better way to do this.....
					// Get the userData if there is no data when routing from user library
					if (!singleAnime.length) {
						singleAnime = helpers.getData('userData').included
						.filter(item => item.attributes.slug === slug);
					}

					const { overview, directives
					} = template.detail(singleAnime[0]);

					helpers.renderTemplate('.detail', overview, directives);
				},
				'manga': function() {
					console.log('Manga Overview');
					sections.toggle('overview'); // Toggle to ...

					const mangaData = helpers.getData('mangaData');

					const {
						overview,
						directives
					} = template.overview(mangaData.data);
					
					helpers.renderTemplate('.view__overview .items', overview, directives);
				},
				'manga/:slug': function(slug) {
					console.log('Manga slug: ', slug);
					sections.toggle('details'); // Toggle to ...

					let singleManga = helpers.getData('mangaData').data
					.filter(item => item.attributes.slug === slug);

					const {
						overview,
						directives
					} = template.detail(singleManga[0]);
					
					helpers.renderTemplate('.detail', overview, directives);
				},
			});
		},
	};



	/*==========================
	=== Our templates
	===========================*/
	const template = {
		noStuff(err) {
			// Need to change the name 
			const overview = {
				['home-title']: `Oops something went wrong`,
				['error-message']: `${err}`,
				items: [{
					item__type: 'anime',
					item__link: {
						item__name: 'test',
						item__image: 'hello',
						item__rating: 88
					},
				}]
			}

			return { overview };
		},
		userOverview(userData, type = 'anime') {
			const { data, included
			} = userData;

			// Because the index of [0] is the user
			if (data.length < 2) {
				console.log('no stuff');
				return this.noStuff('Nothing to see here');
			}

			// Get the user from our includes
			const user = included.filter(item => item.type === 'users');

			// Get all our library entries of the user
			const libEntries = included.filter(item => item.type === type);

			// The weird Transparency syntax
			const overview = {
				['home-title']: `Hi, ${user[0].attributes.name}. This is your ${type == 'anime' ? 'watchlist' : 'readlist' }`,

				// []: ,

				items: libEntries.map((item, i) => ({
					item__type: item.type,
					item__link: {
						item__name: item.attributes.canonicalTitle,
						item__image: '',
						item__rating: data[i].attributes.rating === '0.0' ? '-' : (data[i].attributes.rating * 2) // Will make the rating to be a 0 to 10 rating
					},
					...item.attributes,
					...data[i].attributes
				})
			)};

			const directives = {
				['show-all']: { href: function() {
					return `#library/${type == 'anime' ? '' : 'manga'}`}
				},
				['show-current']: { href: function() {
					return `#library/${type == 'anime' ? 'current' : 'manga/current'}`}
				},
				['show-completed']: { href: function() {
					return `#library/${type == 'anime' ? 'completed' : 'manga/completed'}`}
				},
				['show-planned']: { href: function() {
					return `#library/${type == 'anime' ? 'planned' : 'manga/planned'}`}
				},
				items: {
					item__link: {
						href: function() { return `#${this.item__type}/${this.slug}` },  // '#' + this.slug 
					},
					item__image: {
						src: function() {
							if (this.posterImage) {
								// console.log(this.posterImage);
								return this.posterImage.medium;
							}
							// Return a default image
						}
					}
				}
			};

			return { overview, directives };
		},
		overview(data) {
			// Return a template in a array for Transparency
			const overview = data.map(item => ({
				id: item.id,
				slug: item.attributes.slug,
				item__type: item.type,
				item__link: {
					item__name: item.attributes.canonicalTitle,
					item__image: '',
				},
				...item.attributes,
			}));

			const directives = {
				item__link: {
					href: function() { return `#${this.item__type}/${this.slug}` },
				},
				item__image: {
					src: function() {
						if (this.posterImage) { return this.posterImage.medium; }
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

			const overview = {
				item__name: attr.canonicalTitle,
				item__image: '',
				item__synopsis: attr.synopsis,
				item__rating: attr.averageRating,
				item__totalChOrEps: type === 'anime' ? attr.episodeCount : attr.chaperCount,
				...attr
			};

			const directives = {
				item__image: {
					src: function() {
						if (this.posterImage) { return this.posterImage.medium; }
					}
				}
			};

			return { overview, directives };
		}
		
	}

	const sections = {
		toggle(route) {
			console.log('Change route to: ', route);

			// We remove hide all the inactive views and display the active one (sound logical)
			configs.allRoutes.forEach(element => {
				if (element.id === route) {
					element.classList.remove('inactive');
				} else {
					element.classList.add('inactive');
				}
			});
		}
	};

	// Initializing our app
	app.init();
})();