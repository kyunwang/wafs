	/*==========================
	=== Our templates
	===========================*/
	const template = {
		errorPage(err) {
			// Need to change the name 
			const overview = {
				['home-title']: `Oops something went wrong`,
				['error-message']: `${err}`,
				['show-all']: '',
				['show-current']: '',
				['show-completed']: '',
				['show-planned']: '',
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
				return this.errorPage('Oops the user has nothing in here');
			}

			// Get the user from our includes
			const user = included.filter(item => item.type === 'users');

			// Get all our library entries of the user
			const libEntries = included.filter(item => item.type === type);

			// The weird Transparency syntax
			const overview = {
				['home-title']: `Hi, ${user[0].attributes.name}. This is your ${type == 'anime' ? 'watchlist' : 'readlist' }`,
				['show-planned']: type === 'anime' ? 'Want to see' : 'Want to read',

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
					return `#library/${type === 'anime' ? '' : 'manga'}`}
				},
				['show-current']: { href: function() {
					return `#library/${type === 'anime' ? 'current' : 'manga/current'}`}
				},
				['show-completed']: { href: function() {
					return `#library/${type === 'anime' ? 'completed' : 'manga/completed'}`}
				},
				['show-planned']: { href: function() {
					return `#library/${type === 'anime' ? 'planned' : 'manga/planned'}`}
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
			const items = data.data;
			const type = data.data[0].type;

			// console.log(data.data[0].type);
			
			// Return a template in a array for Transparency
			const overview = {
				['page-title']: type === 'anime' ? 'Check some anime' : 'Check some manga',
				items: items.map(item => ({
					id: item.id,
					slug: item.attributes.slug,
					item__type: item.type,
					item__rating: item.attributes.averageRating ? Math.floor(item.attributes.averageRating) : '-',
					item__link: {
						item__name: item.attributes.canonicalTitle,
						item__image: '',
					},
					...item.attributes,
				}))
			}

			const directives = {
				items: {
					item__link: {
						href: function() { return `#${this.item__type}/${this.slug}` },
					},
					item__image: {
						src: function() {
							if (this.posterImage) { return this.posterImage.medium; }
						}
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
				item__rating: attr.averageRating ? Math.floor(attr.averageRating) : '-',
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

	export default template;