// sidebar.js

import { SIDEBAR_CONFIG } from '../config/sidebar.config.js';
import { ADMIN_VIEWS } from '../config/views.config.js';

// Export the sidebar that is actually
// requested by the view param

export const Sidebar = {
	configure(view = ADMIN_VIEWS.GALLERIES) {
		const notInViewList =
			!Object.keys(SIDEBAR_CONFIG).includes(view)

		if (view === null || notInViewList)
			view = ADMIN_VIEWS.GALLERIES;

		Object.values(SIDEBAR_CONFIG)
			.forEach(v => v.hide());

		SIDEBAR_CONFIG[view].show();
	}
}