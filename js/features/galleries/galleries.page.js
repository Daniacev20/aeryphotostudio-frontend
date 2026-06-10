// galleries.page.js

import { getGalleries_loadEvents } from './galleries.events.js';

let galleriesInit = false;

export function initGalleryPage() {
	if (galleriesInit) return;

	document.addEventListener(
		"DOMContentLoaded",
		getGalleries_loadEvents,
		false
	);

	galleriesInit = true;
}