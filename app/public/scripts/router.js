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
		
		configs.userId = helpers.getData('userId');

		// Redirect to the homepage/template when there no hash is active
		if (!location.hash) { routie('library'); }
	},
	routes() {
		routie({
			'library': async function() {
				console.log('Homepage', storage);
				
				router.toggle('library');

				const userData = helpers.getData('userData');

				// If there is data in the localstorage
				// return and wait till the user has searched for his/her account
				if (helpers.checkData(userData)) {
					return;
				} else {
					// Set view to active because there is data
					configs.userView.classList.add('anim__view--show');
					
					// Set data into temporary local data
					storage.userDataAnime = userData;

					helpers.renderTemplate('.view__home', 'userOverview', storage.userDataAnime);
				}

			},
			'library/manga': async function() {
				console.log('Library Manga', storage);
				
				const userData = helpers.getData('userDataManga');

				if (helpers.checkData(userData)) {
					console.log('return');
					
					return;
				} else {
					console.log('yes');
					
					// Set view to active because there is data
					configs.userView.classList.add('anim__view--show');

					// Set data into temporary local data
					storage.userDataManga = userData;

					helpers.renderTemplate('.view__home', 'userOverview', storage.userDataManga, 'manga');
				}
			},
			'library/:query': function(query) {
				console.log('Library query: ', query);
				const userId = configs.userId || helpers.getData('userId');

				configs.userView.classList.remove('anim__view--show');

				router.loader.show();

				api.getUserDataFilter(userId, 'anime', query, 20, 0)
					.then(res => storage.userDataAnime = res)
					.then(res => {
						helpers.renderTemplate('.view__home', 'userOverview', storage.userDataAnime);
						
						configs.userView.classList.add('anim__view--show');
						router.loader.hide();
					});


			},
			'library/manga/:query': function(query) {
				console.log('Library query Manga: ', query);
				const userId = configs.userId || helpers.getData('userId');

				configs.userView.classList.remove('anim__view--show');

				router.loader.show();

				api.getUserDataFilter(userId, 'manga', query, 20, 0)
					.then(res => storage.userDataManga = res)
					.then(res => {
						helpers.renderTemplate('.view__home', 'userOverview', storage.userDataManga, 'manga');
						
						configs.userView.classList.add('anim__view--show');
						router.loader.hide();
					});
			},
			'anime': function() {
				console.log('Anime overview');
				router.toggle('overview'); // Toggle to ...				

				const animeData = helpers.getData('animeData');

				helpers.renderTemplate('.view__overview .items', 'overview', animeData.data);

				configs.overviewView.classList.add('anim__view--show');

				console.log(storage);

				router.onScrollBottom('anime', 'animeData');
				// router.onScrollBottom(api.getMoreLink.anime, 'anime');
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

				helpers.renderTemplate('.detail', 'detail', singleAnime[0]);

				configs.detailView.classList.add('anim__view--show');
			},
			'manga': function() {
				console.log('Manga Overview');
				router.toggle('overview'); // Toggle to ...

				const mangaData = helpers.getData('mangaData');

				helpers.renderTemplate('.view__overview .items', 'overview', mangaData.data);

				configs.overviewView.classList.add('anim__view--show');
			},
			'manga/:slug': function(slug) {
				console.log('Manga slug: ', slug);
				router.toggle('details'); // Toggle to ...

				let singleManga = helpers.getData('mangaData').data
				.filter(item => item.attributes.slug === slug);

				if (!singleManga.length) {
					singleManga = helpers.getData('userDataManga').included
					.filter(item => item.attributes.slug === slug);
				}

				helpers.renderTemplate('.detail', 'detail', singleManga[0]);
				
				configs.detailView.classList.add('anim__view--show');
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
			this.self.classList.remove('inactive');
		},
		hide() {
			this.self.classList.add('inactive');
		}
	},
	onScrollBottom(type, storageName) {
		// From https://gist.github.com/nathansmith/8939548
		window.onscroll = function() {
			const d = document.documentElement;
			// Window height + diff in space from the top of the page
			const offset = d.scrollTop + window.innerHeight;
			// The total height/length of the page
			const height = d.offsetHeight - 1;

			if (offset >= height) {
				api.getMoreData(type)
					.then(res => {
						// console.log(type, storageName, res);
						storage[storageName] = {
							data: [...storage[storageName].data, ...res.data],
							links: res.links,
							meta: res.meta,
						};
						return res;
					})
					.then(res => {

						console.log(res, 2 ,api.getMoreLink[type]);
					})

			  console.log('At the bottom');
			}
		  };
	}
};

export default router;