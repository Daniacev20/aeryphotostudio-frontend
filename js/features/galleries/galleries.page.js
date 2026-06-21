// galleries.page.js

import {
	getClients_loadEvents,
	toggleFavorite_clickEvents,
	downloadImage_clickEvents,
	openImage_clickEvents,
	closeImage_clickEvents
} from './galleries.events.js';

let galleriesInit = false;

const galleries = document.querySelector("#galleries");
const btnCloseModal = document.querySelector("#btn-close-modal");
const btnPrevImage = document.querySelector("#btn-prev-image");
const btnNextImage = document.querySelector("#btn-next-image");

export function initGalleryPage() {
	if (galleriesInit) return;

	document.addEventListener("DOMContentLoaded", getClients_loadEvents, false);
	document.addEventListener("click", toggleFavorite_clickEvents, false);
	document.addEventListener("click", downloadImage_clickEvents, false);
	galleries.addEventListener("click", openImage_clickEvents, false);
	btnCloseModal.addEventListener("click", closeImage_clickEvents, false);

	galleriesInit = true;
}