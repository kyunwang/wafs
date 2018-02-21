import template from './templates.js';

import api from './api.js';
import { helpers } from './helpers.js';
import { configs, storage } from './config.js';

/*==========================
=== Routing/Routes
===========================*/

const router = {
	init() {
		this.routes(); // Well not really needed it feels like

		// Redirect to the homepage/template when there no hash is active
		if (!location.hash) { routie('library'); }
	},
	routes() {
		routie({
			'library': async function() {
				console.log('Homepage', storage);
				
				router.toggle('library');

				let devUser = helpers.getData('userData');
				let devUserId = helpers.getData('userId');
				

				// If there is data in the localstorage
				// return and wait till the user has searched for his/her account
				if ((devUser === null) || (devUser === 'undefined') || (devUser.errors)) {
					return;
				} else {
					// Set view to active because there is data
					configs.userView.classList.add('user__view--active');
					
					// Set data into temporary local data
					storage.userDataAnime = devUser;
					
					configs.userId = devUserId;

					const { overview, directives
					} = template.userOverview(storage.userDataAnime);

					helpers.renderTemplate('.view__home', overview, directives);
				}

			},
			'library/manga': async function() {
				console.log('Library Manga', storage);
				
				// router.toggle('library');

				if (!storage.userDataManga.data) {
					configs.userView.classList.remove('user__view--active');
					router.loader.show();
					
					const userData = await api.getUserData((configs.userId || helpers.getData('userId')), 'manga', 40);
										
					// Set data into temporary local data
					storage.userDataManga = userData;
				}

				// Set view to active because there is data
				configs.userView.classList.add('user__view--active');

				const { overview, directives
				} = template.userOverview(storage.userDataManga, 'manga');
				
				helpers.renderTemplate('.view__home', overview, directives);

				router.loader.hide();
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
				router.toggle('overview'); // Toggle to ...				

				const animeData = helpers.getData('animeData');

				const { overview, directives
				} = template.overview(animeData.data);

				
				// helpers.renderTemplate('#overview', overview, directives);
				helpers.renderTemplate('.view__overview .items', overview, directives);

				configs.overviewView.classList.add('user__view--active');
			},
			'anime/:slug': function(slug) {
				console.log('Anime slug: ', slug);
				router.toggle('details'); // Toggle to ...
				
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
				router.toggle('overview'); // Toggle to ...

				const mangaData = helpers.getData('mangaData');

				const {
					overview,
					directives
				} = template.overview(mangaData.data);
				
				helpers.renderTemplate('.view__overview .items', overview, directives);

				configs.overviewView.classList.add('user__view--active');
			},
			'manga/:slug': function(slug) {
				console.log('Manga slug: ', slug);
				router.toggle('details'); // Toggle to ...

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
	},
	loader: {
		self: helpers.getElement('#loader'),
		show() {
			console.log('show', this.self);
			
			this.self.classList.remove('inactive');
		},
		hide() {
			this.self.classList.add('inactive');
		}
	}
};

export default router;