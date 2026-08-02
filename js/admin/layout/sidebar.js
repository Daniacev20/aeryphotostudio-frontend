// sidebar.js

import { SIDEBAR_CONFIG } from '../config/sidebar.config.js';
import { ADMIN_VIEWS } from '../config/views.config.js';

// Export the sidebar that is actually
// requested by the view param

export const Sidebar = {
	current: null,
	configure(view = ADMIN_VIEWS.GALLERIES) {
		const notInViewList =
			!Object.keys(SIDEBAR_CONFIG).includes(view)

		if (notInViewList)
			view = ADMIN_VIEWS.GALLERIES;

		const uniqueSidebars = 
			new Set(Object.values(SIDEBAR_CONFIG));
			
		uniqueSidebars.forEach(sb => sb.hide());

		this.current = SIDEBAR_CONFIG[view];
		this.current.show();
		this.current.setActive(view);
	}
}