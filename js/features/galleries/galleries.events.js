// galleries.events.js

import {
	getClientsList,
	getClientGalleries,
	getGalleryAndImagesBySlug,
	downloadImage
} from "../../services/gallery.service.js";
import {
	buildGalleryCard,
	buildCardsRow,
	buildImageCard
} from './galleries.views.js';

const LIMIT_PER_ROW = 5;

async function renderClientsPreview() {
	const galleriesContainer =
		document.querySelector("#galleries");

	const clients = await getClientsList();

	if (clients.length === 0) return;

	galleriesContainer.textContent = "";

	const fragment = document.createDocumentFragment();
	let row = buildCardsRow();

	for (let currentClient of clients) {
		if (!currentClient.preview)
			continue;

		row.appendChild(
			buildGalleryCard(
				currentClient.preview,
				currentClient.name,
				`/entrega.html?client=${currentClient._id}`,
				false
			)
		);

		if (row.childElementCount === LIMIT_PER_ROW) {
			fragment.appendChild(row);
			row = buildCardsRow();
		}
	}

	if (row.childElementCount > 0)
		fragment.appendChild(row);

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

	galleriesContainer.textContent = "";

	const fragment = document.createDocumentFragment();
	let row = buildCardsRow();

	for (let gallery of clientGalleries) {
		if (!gallery.preview)
			continue;

		row.appendChild(
			buildGalleryCard(
				gallery.preview,
				gallery.title,
				`/entrega.html?slug=${gallery.slug}`
			)
		);

		if (row.childElementCount === LIMIT_PER_ROW) {
			fragment.appendChild(row);
			row = buildCardsRow();
		}
	}

	if (row.childElementCount > 0)
		fragment.appendChild(row);

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
		return;
	}

	galleriesContainer.textContent = "";

	const fragment = document.createDocumentFragment();
	let row = buildCardsRow();

	for (const image of galleryAndImages.images) {
		row.appendChild(
			buildImageCard(image.src, {
				imageId: image._id,
				filename: image.filename,
				download: galleryAndImages.downloadsEnabled
			})
		);

		if (row.childElementCount === LIMIT_PER_ROW) {
			fragment.appendChild(row);
			row = buildCardsRow();
		}
	}

	if (row.childElementCount > 0)
		fragment.appendChild(row);

	galleriesContainer.appendChild(fragment);
}

function handleBackToLinkDisplay(params) {
	const backTo = document.querySelector("#back-to");

	backTo.hidden = params.size === 0;
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
	downloadImage_clickEvents
};