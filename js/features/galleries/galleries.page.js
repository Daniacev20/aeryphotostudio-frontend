// galleries.page.js

import {
	getClients_loadEvents,
	toggleFavorite_clickEvents,
	downloadImage_clickEvents,
	downloadGallery_clickEvents,
	openImage_clickEvents,
	closeImage_clickEvents,
	previousImage_clickEvents,
	nextImage_clickEvents,
	protectedGallery_clickEvents,
	sendPin_clickEvents,
	closePinModal_clickEvents,
	txtPinEnter_keyEvents
} from './galleries.events.js';
import { GalleryModal, PinModal } from '../../conf/gallery.state.js';

let galleriesInit = false;

const galleries = document.querySelector("#galleries");

export function initGalleryPage() {
	if (galleriesInit) return;

	document.addEventListener("DOMContentLoaded", getClients_loadEvents, false);
	document.addEventListener("click", toggleFavorite_clickEvents, false);
	document.addEventListener("click", downloadImage_clickEvents, false);
	document.addEventListener("click", downloadGallery_clickEvents, false);
	galleries.addEventListener("click", protectedGallery_clickEvents, false);
	galleries.addEventListener("click", openImage_clickEvents, false);
	GalleryModal.dialog.addEventListener("click", closeImage_clickEvents, false);
	GalleryModal.dialog.addEventListener("click", previousImage_clickEvents, false);
	GalleryModal.dialog.addEventListener("click", nextImage_clickEvents, false);
	PinModal.dialog.addEventListener("click", sendPin_clickEvents, false);
	PinModal.dialog.addEventListener("click", closePinModal_clickEvents, false);
	PinModal.dialog.addEventListener("keydown", txtPinEnter_keyEvents, false);

	galleriesInit = true;
}