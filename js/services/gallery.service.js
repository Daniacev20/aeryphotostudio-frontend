// services/gallery.service.js

async function getGallery(slug) {
	const response = await fetch(
		`/api/galleries/${slug}`
	);

	return await response.json();
}

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

export {
	getGallery,
	getPublicGalleries,
	getPrivateGalleries
}