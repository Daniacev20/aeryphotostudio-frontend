// galleries.page.js

import {
	getClients_loadEvents,
	toggleFavorite_clickEvents,
	downloadImage_clickEvents,
	downloadGallery_clickEvents,
	openImage_clickEvents,
	closeImage_clickEvents,
	previousImage_clickEvents,
	nextImage_clickEvents
} from './galleries.events.js';
import { Modal } from '../../conf/gallery.state.js';

let galleriesInit = false;

const galleries = document.querySelector("#galleries");

export function initGalleryPage() {
	if (galleriesInit) return;

	document.addEventListener("DOMContentLoaded", getClients_loadEvents, false);
	document.addEventListener("click", toggleFavorite_clickEvents, false);
	document.addEventListener("click", downloadImage_clickEvents, false);
	document.addEventListener("click", downloadGallery_clickEvents, false);
	galleries.addEventListener("click", openImage_clickEvents, false);
	Modal.dialog.addEventListener("click", closeImage_clickEvents, false);
	Modal.dialog.addEventListener("click", previousImage_clickEvents, false);
	Modal.dialog.addEventListener("click", nextImage_clickEvents, false);

	galleriesInit = true;
}