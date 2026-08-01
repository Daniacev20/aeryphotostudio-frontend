// header.js

import { HEADER_CONFIG } from '../config/header.config.js';

export const Header = {
	controls: {
		title: document.getElementById("view-title"),
		searchGallery: document.getElementById("search-gallery"),
		btnPreviousView: document.getElementById("btn-previous-view"),
		btnNewGallery: document.getElementById("btn-new-gallery"),
		btnStatusFilter: document.getElementById("btn-status-filter"),
		btnDateFilter: document.getElementById("btn-date-filter"),
		btnGetLink: document.getElementById("btn-get-link")
	},

	configure(view = "galleries") {
		Object.values(this.controls)
			.forEach(v => v.hidden = true);
		
		this.controls.title.textContent =
			HEADER_CONFIG[view].title;

		for (let p of HEADER_CONFIG[view].controls) {
			this.controls[p].hidden = false;
		}
	}
};