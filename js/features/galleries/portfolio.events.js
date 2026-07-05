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

const galleries = document.querySelector("#galleries");

function getCircularIndex(array, index) {
	return ((index % array.length) + array.length) % array.length;
}

function handleInfoBarDisplay(params) {
	// show the back, download button and title based on the stage
	const backTo = document.querySelector(".back-to");

	backTo.hidden = params.size === 0;
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
		renderPortfolioGalleries(galleries, portfolio);
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
			galleryState.images, galleryState.currentImageIndex
		);

	renderModal(galleryState);
}

function nextImage_clickEvents(event) {
	const btnNext = event.target.closest("#next-image");

	if (!btnNext) return;

	galleryState.currentImageIndex++;

	galleryState.currentImageIndex = 
		getCircularIndex(
			galleryState.images, galleryState.currentImageIndex
		);

	renderModal(galleryState);
}

export {
	getPortfolio_loadEvents,
	openImage_clickEvents,
	closeImage_clickEvents,
	previousImage_clickEvents,
	nextImage_clickEvents
}