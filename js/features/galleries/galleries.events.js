// galleries.events.js

import {
	getClientsList,
	getClientGalleries,
	getGalleryAndImagesBySlug,
	toggleFavorite,
	downloadImage
} from "../../services/gallery.service.js";
import {
	buildGalleryCard,
	buildImageCard
} from './galleries.views.js';

async function renderClientsPreview() {
	const galleriesContainer =
		document.querySelector("#galleries");

	const clients = await getClientsList();

	if (clients.length === 0) return; // wip

	galleriesContainer.innerHTML = "";

	const fragment = document.createDocumentFragment();

	for (let currentClient of clients) {
		if (!currentClient.preview)
			continue;

		fragment.appendChild(
			buildGalleryCard(
				currentClient.preview,
				currentClient.name,
				`/entrega.html?client=${currentClient._id}`,
				false
			)
		);
	}

	galleriesContainer.appendChild(fragment);
}

async function renderClientGalleries() {
	const galleriesContainer =
		document.querySelector("#galleries");
		
	const params = new URLSearchParams(location.search);
	const clientGalleries = await getClientGalleries(
		params.get("client")
	);

	if (clientGalleries.length === 0) return; // wip

	galleriesContainer.innerHTML = "";

	const fragment = document.createDocumentFragment();

	for (let gallery of clientGalleries) {
		if (!gallery.preview)
			continue;

		fragment.appendChild(
			buildGalleryCard(
				gallery.preview,
				gallery.title,
				`/entrega.html?slug=${gallery.slug}`
			)
		);
	}

	galleriesContainer.appendChild(fragment);
}

async function renderGalleryImages() {
	const galleriesContainer =
		document.querySelector("#galleries");
	const params = new URLSearchParams(location.search);
	const galleryAndImages = await getGalleryAndImagesBySlug(
		params.get("slug")
	);

	if (!galleryAndImages) {
		console.log("Error abriendo galeria.");
		return; // wip
	}

	galleriesContainer.innerHTML = "";

	const fragment = document.createDocumentFragment();

	for (const image of galleryAndImages.images) {
		fragment.appendChild(
			buildImageCard(image.src, {
				imageId: image._id,
				filename: image.filename,
				favoriteStatus: image.favorite,
				downloadButton: galleryAndImages.downloadsEnabled,
				downloadedStatus: image.downloaded
			})
		);
	}

	galleriesContainer.appendChild(fragment);
}

function handleBackToLinkDisplay(params) {
	const backTo = document.querySelector("#back-to");

	backTo.hidden = params.size === 0;
}

async function toggleFavorite_clickEvents(event) {
	const btnFavorite = event.target.closest(".btn-favorite");

	if (!btnFavorite || btnFavorite.disabled)
		return;

	const imageId = btnFavorite.dataset.imageId;
	btnFavorite.disabled = true;

	try {
		const image = await toggleFavorite(imageId);

		if (!image) return;

		btnFavorite.classList.toggle("is-favorite", image.favorite);
	}
	finally {
		btnFavorite.disabled = false;
	}
}

async function downloadImage_clickEvents(event) {
	const btnDownload = event.target.closest(".btn-download");

	if (!btnDownload) return;

	await downloadImage(
		btnDownload.dataset.imageId,
		btnDownload.dataset.filename
	);
}

async function getClients_loadEvents(event) {
	const params = new URLSearchParams(location.search);
	const client = params.get("client");
	const slug = params.get("slug");

	handleBackToLinkDisplay(params);

	if (!client && !slug)
		await renderClientsPreview();
	else if (client && !slug)
		await renderClientGalleries();
	else if (!client && slug)
		renderGalleryImages();
}

export {
	getClients_loadEvents,
	toggleFavorite_clickEvents,
	downloadImage_clickEvents
};