// portfolio.events.js

import { galleryState } from '../../conf/gallery.state.js';

import {
	getPortfolioGalleries,
	getGalleryAndImagesBySlug
} from '../../services/gallery.service.js';

import {
	renderPortfolioGalleries,
	renderPortfolioGalleryImages
} from './portfolio.views.js';

const galleries = document.querySelector("#galleries");

async function getPortfolio_loadEvents(event) {
	const params = new URLSearchParams(location.search);
	const slug = params.get("slug");

	if (slug) {
		const gallery = await getGalleryAndImagesBySlug(slug);
		renderPortfolioGalleryImages(
			galleries,
			gallery,
			galleryState
		);
	}
	else {
		const portfolio = await getPortfolioGalleries();
		renderPortfolioGalleries(galleries, portfolio);
	}
}

export {
	getPortfolio_loadEvents
}