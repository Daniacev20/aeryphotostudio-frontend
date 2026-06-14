// galleries.events.js

import {
	getClientsList,
	getClientGalleries
} from "../../services/gallery.service.js";
import {
	buildGalleryCard,
	buildCardsRow
} from './galleries.views.js';

const LIMIT_PER_ROW = 3;

async function renderClientsPreview() {
	const galleriesContainer =
		document.querySelector("#galleries");

	galleriesContainer.textContent = "";

	const clients = await getClientsList();
	const fragment = document.createDocumentFragment();
	let row = buildCardsRow();

	for (let currentClient of clients) {
		if (!currentClient.preview)
			continue;

		row.appendChild(
			buildGalleryCard(
				currentClient.preview,
				currentClient.name,
				`/entrega.html?client=${currentClient._id}`
			)
		);

		if (row.childElementCount === LIMIT_PER_ROW) {
			fragment.appendChild(row);
			row = buildCardsRow();
		}

		if (row.childElementCount < LIMIT_PER_ROW &&
			currentClient === clients[clients.length - 1]) {
			fragment.appendChild(row);
		}
	}

	galleriesContainer.appendChild(fragment);
}

async function renderClientGalleries() {
	const galleriesContainer =
		document.querySelector("#galleries");

	galleriesContainer.textContent = "";
		
	const params = new URLSearchParams(location.search);
	const clientGalleries = await getClientGalleries(
		params.get("client")
	);

	console.log(clientGalleries)

	if (!clientGalleries) return;

	const fragment = document.createDocumentFragment();
	let row = buildCardsRow();

	for (let gallery of clientGalleries) {
		if (!gallery.preview)
			continue;

		row.appendChild(
			buildGalleryCard(
				gallery.preview,
				gallery.coverImage,
				`/entrega.html?slug=${gallery.slug}`
			)
		);

		if (row.childElementCount === LIMIT_PER_ROW) {
			fragment.appendChild(row);
			row = buildCardsRow();
		}

		if (row.childElementCount < LIMIT_PER_ROW &&
			gallery === clientGalleries[clientGalleries.length - 1]) {
			fragment.appendChild(row);
		}
	}

	galleriesContainer.appendChild(fragment);
}

async function getClients_loadEvents(event) {
	const params = new URLSearchParams(location.search);

	if (!params.get("client"))
		await renderClientsPreview();
	else
		await renderClientGalleries();
}

export {
	getClients_loadEvents
};