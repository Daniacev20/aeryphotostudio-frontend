// galleryfiltering.js

function filterClients(search, stateObject) {
	return stateObject.clients.filter(c => {
		return c.name
			.toLowerCase()
			.includes(search);
	});
}

function filterGalleries(search, stateObject) {
	return stateObject.galleries.filter(g => {
		return g.title
			.toLowerCase()
			.includes(search.trim());
	});
}

export {
	filterClients,
	filterGalleries
}