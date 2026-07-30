// dashboard.events.js

import { ViewRouter } from '../navigation/view.router.js';
import { Header } from '../layout/header.js';
import { Sidebar } from '../layout/sidebar.js';
import { Views } from '../views/views.js';

export const DashboardEvents = {
	configureLayout() {
		const view = ViewRouter.current;
		ViewRouter.replace(view);
		Header.configure(view);
		Sidebar.configure(view);
		Views.configure(view);
	}
};