// dashboard.events.js

import { Header } from '../layout/header.js';
import { Sidebar } from '../layout/sidebar.js';

export const DashboardEvents = {
	get currentView() {
		const params = 
			new URLSearchParams(location.search);

		return params.get("view");
	},
	configureLayout() {
		Header.configure(this.currentView);
		Sidebar.configure(this.currentView);
	}
};