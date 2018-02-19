const helpers = {
	getHash() { return location.hash; },
	getElement(element) { return document.querySelector(element); },
	getElements(element) { return document.querySelectorAll(element); },
	// getAllRoutes () { return helpers.getElements('section') },
	shortenString(text, start, end) { return end ? text.substr(start, end) : text.substr(start); },
	toInt(item) { return parseInt(item, 10); },
	
	stringify(data) { return JSON.stringify(data); },
	parse(data) { return JSON.parse(data); },
	setData(key, data) { return localStorage.setItem(key, this.stringify(data)); },
	getData(key) { return this.parse(localStorage.getItem(key)); },
	deleteData(key) { return localStorage.removeItem(key); },

	renderTemplate(element, template, directives = {}) { return Transparency.render(helpers.getElement(element), template, directives); }
};

const debug = {
	error(err) { console.log('Oops a error: ', err); return err; }
};

export {
	helpers,
	debug
};