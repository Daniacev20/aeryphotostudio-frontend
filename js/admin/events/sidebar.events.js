// sidebar.events.js

import { Sidebar } from '../layout/sidebar.js';

export const SidebarEvents = {
	toggleSidebar_clickEvents(event) {
		const target =
			event.target.closest("#btn-toggle-sidebar");

		if(!target) return;

		Sidebar.toggleSidebar();
	}
};