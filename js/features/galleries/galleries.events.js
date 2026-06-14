// galleries.events.js

import {
	getClientsList
} from "../../services/gallery.service.js";
import {
	buildGalleryCard,
	buildCardsRow
} from './galleries.views.js';

const LIMIT_PER_ROW = 3;

async function getClients_loadEvents(event) {
	const galleriesContainer =
		document.querySelector("#galleries");
	const clients = await getClientsList();
	const fragment = document.createDocumentFragment();
	let row = buildCardsRow();

	for (let currentClient of clients) {
		if (!currentClient.preview)
			continue;

		row.appendChild(
			buildGalleryCard(
				currentClient.preview,
				currentClient.name
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

	galleriesContainer.appendChild(fragment)
}

async function getGalleries_loadEvents(event) {
	const galleriesContainer =
		document.querySelector("#galleries");
	const galleries = await getGalleries();
	const mainFragment = document.createDocumentFragment();
	let row = buildCardsRow();

	for (let i = 0; i < galleries.length - 1; i++) {
		const src = galleries[i].coverImage
			? `/api/gallery-image/${galleries[i].slug}/${galleries[i].coverImage}`
			: "/assets/empty.jpg"

		row.appendChild(
			buildGalleryCard(
				src,
				galleries[i].coverImage || "Galer\u00EDa vac\u00EDa."
			)
		);

		if (row.childElementCount === LIMIT_PER_ROW) {
			mainFragment.appendChild(row);
			row = buildCardsRow();
		}

		if (row.childElementCount < LIMIT_PER_ROW && 
			i === galleries.length) {
			mainFragment.appendChild(row);
		}
	}
	
	galleriesContainer.appendChild(mainFragment);
}

export {
	getClients_loadEvents
};