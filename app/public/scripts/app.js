'use strict';

import api from './api.js';
import template from './templates.js';
import router from './router.js';
import { helpers } from './helpers.js';
import { configs, storage } from './config.js';

(function () {
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

				if (!searchUserInput.value.length) return;

				configs.userView.classList.remove('anim__view--show');


				router.loader.show();
				

				const user = await api.searchForUser(searchUserInput.value);				

				// If there is any data found of the user. Get his data
				if (user.data.length) {
					// First clean the user storage
					storage.userDataAnime = [];
					storage.userDataManga = [];


					const [userData, userDataManga] = await Promise.all([
						api.getUserData(user.data[0].id, null, 40),
						api.getUserData(user.data[0].id, 'manga', 40)
					]);
					
					// Save the userid for the session
					configs.userId = user.data[0].id;

					// Save the user id to localstorage for filter usage ect.
					helpers.setData('userId', user.data[0].id);

					// Save the data in localstorage
					helpers.setData('userData', userData);
					helpers.setData('userDataManga', userDataManga);

					const { overview, directives
					} = template.userOverview(userData);
					
					helpers.renderTemplate('.view__home', overview, directives);

					configs.userView.classList.add('anim__view--show');

					router.loader.hide();

					// Always return to library. In case the user was on library/manga
					routie('library');
				} else {
					// Return a message for the user
					const { overview } =
					template.errorPage(`We cannot find ${searchUserInput.value}`);

					helpers.renderTemplate('.view__home', overview);

					configs.userView.classList.add('anim__view--show');

					router.loader.hide();
				}
			});


			// init on scroll bottom events
			this.onScrollBottom();
		},
		onScrollBottom() {
			// window.onscroll = function(ev) {
			// 	if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
			// 		alert("you're at the bottom of the page");
			// 	}
			// };
			// From https://gist.github.com/nathansmith/8939548
			window.onscroll = function() {
				const d = document.documentElement;
				const offset = d.scrollTop + window.innerHeight;
				const height = d.offsetHeight - 2;
			  
				console.log('offset = ' + offset);
				console.log('height = ' + height);
			  
				if (offset >= height) {
				  console.log('At the bottom');
				}
			  };
		}
	}

	/*==========================
	=== Application and Router
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
					// Set our initial router and animedata in a promise
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
				configs.userView,
				configs.overviewView,
				configs.detailView,
			] = await Promise.all([
				helpers.getElements('.view'),
				helpers.getElement('#search-user-input'),
				helpers.getElement('#search-user-btn'),
				helpers.getElement('.view__home .anim__view'),
				helpers.getElement('#overview .anim__view'),
				helpers.getElement('#details .anim__view'),
				// helpers.getElement('#user-view'),
			]);
			
			
			// Initiate our events (clicks ect.)
			events.init();

			// Initialize our route
			router.init();
		}
	};
	

	// Initializing our app
	app.init();
})();