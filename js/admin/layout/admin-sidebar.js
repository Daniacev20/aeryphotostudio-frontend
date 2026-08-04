// admin-sidebar.js

import { MAX_HANDHELD_WIDTH } from '../config/responsive.config.js';

export const AdminSidebar = {
	element: document.getElementById("admin-sidebar"),
	controls: {
		title: document.getElementById("sidebar-title"),
		options: document.querySelector(".sidebar-options"),
		actions: document.querySelector(".admin-actions")
	},

	show() {
		document.querySelectorAll(".sidebar")
			.forEach(sb => sb.hidden = true);
		this.element.hidden = (window.innerWidth <= MAX_HANDHELD_WIDTH);
	},

	hide() {
		this.element.hidden = true;
	},
	setActive(view) {
		this.element.querySelectorAll("[data-view]")
			.forEach(b => b.classList.remove("is-active"));

		const active =
			this.element.querySelector(`[data-view="${view}"]`);

		active?.classList.add("is-active");
	}
};