// services/gallery.service.js

const BASE_URL = '/api';

async function getClientsList() {
	const response = await fetch(
		`${BASE_URL}/clients-protected`
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
	
	if (response.status === 401) {
		throw new Error("Pin requerido.");
	}
	else if (!response.ok) {
		const error = response.json();
		throw new Error(error.message);
	}

	return await response.json();
}

async function getPortfolioGalleries() {
	const response = await fetch(
		`${BASE_URL}/galleries/portfolio`
	);

	if (!response.ok) {
		const error = await response.json();
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

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return await response.json();
}

async function verifyGalleryAccess(slug) {
	const response = await fetch(
		`${BASE_URL}/gallery/${slug}/access`
	);

	const result = await response.json();

	if (!result.hasAccess)
		throw new Error("Pin requerido.");

	return result.hasAccess;
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

		if (response.status === 400 &&
				error.message === "L\u00EDmite de favoritos alcanzado.") {
			alert(error.message);
		}

		console.error(error);
		return false;
	}

	return await response.json();
}

async function downloadGallery(slug) {
	const response = await fetch(
		`${BASE_URL}/gallery/${slug}/download`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			// wip: adapt page to send email according to server
			body: JSON.stringify({ email: "" })
		}
	);

	if (!response.ok) {
		const error = await response.json();
		console.error("Error al descargar: ", error.message);
		return;
	}

	const blob = await response.blob();

	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;

	const disposition = response.headers.get(
		"Content-Disposition"
	);

	const match = disposition?.match(
		/filename="([^"]+)"/
	);

	link.download = match
	? match[1]
	: `${slug}.zip`;

	link.click();

	URL.revokeObjectURL(url);
}

export {
	getClientsList,
	getClientGalleries,
	getGalleryAndImagesBySlug,
	getPortfolioGalleries,
	validateGalleryPin,
	verifyGalleryAccess,
	downloadImage,
	toggleFavorite,
	downloadGallery
}