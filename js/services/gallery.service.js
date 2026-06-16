// services/gallery.service.js

async function getPublicGalleries() {
	const response = await fetch(
		"/api/galleries?visibility=public"
	);

	return await response.json();
}

async function getPrivateGalleries() {
	const response = await fetch(
		"/api/galleries?visibility=private"
	);

	return await response.json();
}

async function getClientsList() {
	const response = await fetch(
		"/api/clients"
	);

	return await response.json();
}

async function getClientGalleries(clientId) {
	const response = await fetch(
		`/api/clients/${clientId}/galleries`
	);

	return await response.json();
}

async function getGalleryImagesBySlug(slug) {
	const response = await fetch(
		`/api/galleries/${slug}/images`
	);

	return await response.json();
}

export {
	getPublicGalleries,
	getPrivateGalleries,
	getGalleryImagesBySlug,
	getClientsList,
	getClientGalleries
}