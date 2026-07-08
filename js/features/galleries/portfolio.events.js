// portfolio.events.js

import {
	galleryState,
	PortfolioModal
} from '../../state/gallery.state.js';

import {
	getPortfolioGalleries,
	getGalleryAndImagesBySlug
} from '../../services/gallery.service.js';

import {
	renderPortfolioGalleries,
	renderPortfolioGalleryImages,
	renderModal
} from './portfolio.views.js';

import { getCircularIndex } from '../../utils/gallery.utils.js';
import { filterGalleries } from '../../utils/gallery.filtering.js';

const galleries = document.querySelector("#galleries");
const frmSearch = document.querySelector("#frm-gallery-search");
const searchBar = document.querySelector("#search-gallery");
const backTo = document.querySelector(".back-to");


function handleInfoBarDisplay(params) {
	// show the back, download button and title based on the stage

	backTo.hidden = params.size === 0;
	handleSearchDisplay(params);
}

function handleSearchDisplay(params) {
	frmSearch.hidden = params.has("slug");

	if (params.size === 0) {
		searchBar.placeholder = "Buscar galer\u00EDa";
	}
}

async function getPortfolio_loadEvents(event) {
	const params = new URLSearchParams(location.search);
	const slug = params.get("slug");

	handleInfoBarDisplay(params);

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
		renderPortfolioGalleries(galleries, portfolio, galleryState);
	}
}

function openImage_clickEvents(event) {
	const img = event.target.closest(".gallery-image");
	if (!img) return;

	galleryState.currentImageIndex = Number(img.dataset.index);
	renderModal(galleryState);
	PortfolioModal.dialog.showModal();
}

function closeImage_clickEvents(event) {
	const btnClose = event.target.closest(".btn-close-modal");

	if (!btnClose) return;

	PortfolioModal.dialog.close();
}

function previousImage_clickEvents(event) {
	const btnPrev = event.target.closest("#prev-image");

	if (!btnPrev) return;

	galleryState.currentImageIndex--;

	galleryState.currentImageIndex = 
		getCircularIndex(
			galleryState.galleries.images, galleryState.currentImageIndex
		);

	renderModal(galleryState);
}

function nextImage_clickEvents(event) {
	const btnNext = event.target.closest("#next-image");

	if (!btnNext) return;

	galleryState.currentImageIndex++;

	galleryState.currentImageIndex = 
		getCircularIndex(
			galleryState.galleries.images, galleryState.currentImageIndex
		);

	renderModal(galleryState);
}

function searchBar_inputEvents(event) {
	const search = event.target.closest("#search-gallery");

	if (!search) return;

	const params = new URLSearchParams(location.search);

	const portfolio = filterGalleries(
		search.value.trim(),
		galleryState
		);

	renderPortfolioGalleries(galleries, portfolio, null);
}

export {
	getPortfolio_loadEvents,
	openImage_clickEvents,
	closeImage_clickEvents,
	previousImage_clickEvents,
	nextImage_clickEvents,
	searchBar_inputEvents
}