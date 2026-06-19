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

async function getGalleryAndImagesBySlug(slug) {
	const response = await fetch(
		`/api/galleries/${slug}/images`
	);

	return await response.json();
}

async function downloadImage(imageId, filename) {
	const response = await fetch(
		`/api/gallery-images/${imageId}/download`
	);

	if (!response.ok) {
		const error = await response.json();
		console.error(error.message);
		return;
	}

	const blob = await response.blob();
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = filename;

	document.body.appendChild(a);
	a.click();
	a.remove();

	URL.revokeObjectURL(url);
}

export {
	getPublicGalleries,
	getPrivateGalleries,
	getGalleryAndImagesBySlug,
	getClientsList,
	getClientGalleries,
	downloadImage
}