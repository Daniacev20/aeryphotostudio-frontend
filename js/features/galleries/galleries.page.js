// galleries.page.js

import {
	getClients_loadEvents,
	toggleFavorite_clickEvents,
	downloadImage_clickEvents,
	openImage_clickEvents,
	closeImage_clickEvents,
	previousImage_clickEvents,
	nextImage_clickEvents
} from './galleries.events.js';

let galleriesInit = false;

const galleries = document.querySelector("#galleries");
const modalDialog = document.querySelector("#image-modal-dialog");

export function initGalleryPage() {
	if (galleriesInit) return;

	document.addEventListener("DOMContentLoaded", getClients_loadEvents, false);
	document.addEventListener("click", toggleFavorite_clickEvents, false);
	document.addEventListener("click", downloadImage_clickEvents, false);
	galleries.addEventListener("click", openImage_clickEvents, false);
	modalDialog.addEventListener("click", closeImage_clickEvents, false);
	modalDialog.addEventListener("click", previousImage_clickEvents, false);
	modalDialog.addEventListener("click", nextImage_clickEvents, false);

	galleriesInit = true;
}