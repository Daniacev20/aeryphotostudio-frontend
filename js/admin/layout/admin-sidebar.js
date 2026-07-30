// admin-sidebar.js

export const AdminSidebar = {
	element: document.getElementById("admin-sidebar"),
	controls: {
		title: document.getElementById("sidebar-title"),
		options: document.querySelector(".sidebar-options"),
		actions: document.querySelector(".admin-actions")
	},

	show() {
		this.element.hidden = false;
	},

	hide() {
		this.element.hidden = true;
	}
};