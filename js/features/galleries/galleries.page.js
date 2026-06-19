// galleries.page.js

import {
	getClients_loadEvents,
	downloadImage_clickEvents
} from './galleries.events.js';

let galleriesInit = false;

export function initGalleryPage() {
	if (galleriesInit) return;

	document.addEventListener("DOMContentLoaded", getClients_loadEvents, false);
	document.addEventListener("click", downloadImage_clickEvents, false);

	galleriesInit = true;
}