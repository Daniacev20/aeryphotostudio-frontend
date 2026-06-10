// galleries.events.js

import {
	getPrivateGalleries
} from "../../services/gallery.service.js";
import {
	buildGalleryCard,
	buildCardsRow
} from './galleries.views.js';

const LIMIT_PER_ROW = 3;

async function getGalleries_loadEvents(event) {
	const galleriesContainer =
		document.querySelector("#galleries");
	const galleries = await getPrivateGalleries();
	const mainFragment = document.createDocumentFragment();
	let row = buildCardsRow();

	for (let i = 0; i < galleries.length - 1; i++) {
		console.log({
		    slug: galleries[i].slug,
		    cover: galleries[i].coverImage,
		    url: `/api/gallery-image/${galleries[i].slug}/${galleries[i].coverImage}`
		});

		row.appendChild(
			buildGalleryCard(
				`/api/gallery-image/${galleries[i].slug}/${galleries[i].coverImage}`,
				galleries[i].coverImage
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
	getGalleries_loadEvents
};