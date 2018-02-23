import { debug } from './helpers.js';

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
		getMoreLink: {
			anime: '',
			manga: '',
			userManga: '',
			userAnime: ''
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
		getTrending: async function(kind = 'anime', limit = 10, offset = 0) {
			return await fetch(`https://kitsu.io/api/edge/trending/${kind}`, 
			{ headers: this.baseHeader })
			.then(res => res.json())
			.then(res => {
				console.log(res);
				return res;
			})
			.catch(err => debug.error(err))

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
		getMoreData: async function(linkType) {
			return await fetch(api.getMoreLink[linkType], { headers: this.baseHeader })
			.then(res => res.json())
			.then(res => {
				api.getMoreLink[linkType] = res.links.next;
				return res;
			})
			.catch(err => debug.error(err));
		}
	}

	export default api;