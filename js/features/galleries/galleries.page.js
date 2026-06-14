// galleries.page.js

import { getClients_loadEvents } from './galleries.events.js';

let galleriesInit = false;

export function initGalleryPage() {
	if (galleriesInit) return;

	document.addEventListener(
		"DOMContentLoaded",
		getClients_loadEvents,
		false
	);

	galleriesInit = true;
}