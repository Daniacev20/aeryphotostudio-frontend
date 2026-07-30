// gallery-sidebar.js

export const GallerySidebar = {
	element: document.getElementById("gallery-sidebar"),
	controls: {
		cover: document.getElementById("sidebar-cover"),

		actionImages: document.getElementById("action-images"),
		actionDesign: document.getElementById("action-design"),
		actionSettings: document.getElementById("action-settings"),
		actionActivity: document.getElementById("action-activity"),

		contentTitle: document.getElementById("sidebar-content-title"),
		contentMain: document.getElementById("sidebar-content-main")
	},

	show() {
		document.querySelectorAll(".sidebar")
			.forEach(sb => sb.hidden = true);
		this.element.hidden = false;
	},

	hide() {
		this.element.hidden = true;
	}
};