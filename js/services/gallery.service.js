// services/gallery.service.js

const BASE_URL = '/api';

async function getPublicGalleries() {
	const response = await fetch(
		`${BASE_URL}/galleries?visibility=public`
	);

	return await response.json();
}

async function getPrivateGalleries() {
	const response = await fetch(
		`${BASE_URL}/galleries?visibility=private`
	);

	return await response.json();
}

async function getClientsList() {
	const response = await fetch(
		`${BASE_URL}/clients`
	);

	return await response.json();
}

async function getClientGalleries(clientId) {
	const response = await fetch(
		`${BASE_URL}/clients/${clientId}/galleries`
	);

	return await response.json();
}

async function getGalleryAndImagesBySlug(slug) {
	const response = await fetch(
		`${BASE_URL}/galleries/${slug}/images`
	);
	
	if (!response.ok) {
		const error = response.json();
		throw new Error(error.message);
	}

	return await response.json();
}

async function validateGalleryPin(pin, slug) {
	const response = await fetch(
		`${BASE_URL}/gallery/${slug}/auth`,
		{
			method: "POST",
			body: JSON.stringify({ pin })
		}
	);

	return await response.json();
}

async function verifyGalleryAccess(slug) {
	const response = await fetch(
		`${BASE_URL}/gallery/${slug}/access`
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return await response.json();
}

async function downloadImage(imageId, filename) {
	const response = await fetch(
		`${BASE_URL}/gallery-images/${imageId}/download`
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

async function toggleFavorite(imageId) {
	const response = await fetch(
		`${BASE_URL}/gallery-image/${imageId}/toggle-favorite`,
		{
			method: "PATCH"
		}
	);

	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		return false;
	}

	return await response.json();
}

async function downloadGallery(slug) {
	window.open(
		`${BASE_URL}/gallery/${slug}/download`
	);
}

export {
	getPublicGalleries,
	getPrivateGalleries,
	getGalleryAndImagesBySlug,
	getClientsList,
	getClientGalleries,
	validateGalleryPin,
	verifyGalleryAccess,
	downloadImage,
	toggleFavorite,
	downloadGallery
}