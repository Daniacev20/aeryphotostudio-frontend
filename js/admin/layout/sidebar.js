// sidebar.js

import { SIDEBAR_CONFIG } from '../config/sidebar.config.js';
import { ADMIN_VIEWS } from '../config/views.config.js';
import { MAX_HANDHELD_WIDTH } from '../config/responsive.config.js';

// Export the sidebar that is actually
// requested by the view param

export const Sidebar = {
	current: null,
	btnToggle: document.getElementById("btn-toggle-sidebar"),

	updateResponsiveState() {
		if (window.innerWidth > MAX_HANDHELD_WIDTH) {
			this.btnToggle.hidden = true;
			this.current.show();
		}
		else {
			this.btnToggle.hidden = false;
			this.current.hide();
		}
	},

	toggleSidebar() {
		if (window.innerWidth <= MAX_HANDHELD_WIDTH) {
			this.current.element.hidden =
				!this.current.element.hidden;
		}
	},
	
	configure(view = ADMIN_VIEWS.GALLERIES) {
		const notInViewList =
			!Object.keys(SIDEBAR_CONFIG).includes(view)

		if (notInViewList)
			view = ADMIN_VIEWS.GALLERIES;

		const uniqueSidebars = 
			new Set(Object.values(SIDEBAR_CONFIG));
			
		uniqueSidebars.forEach(sb => sb.hide());

		// select active sidebar based on the view
		this.current = SIDEBAR_CONFIG[view];

		// show depending on the device visiting
		this.updateResponsiveState();

		// highlight the icon of the active view
		this.current.setActive(view);
	}
}