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
	},
	setActive(view) {
		this.element.querySelectorAll("[data-view]")
			.forEach(b => b.classList.remove("is-active"));

		const active =
			this.element.querySelector(`[data-view="${view}"]`);

		active?.classList.add("is-active");
	}
};