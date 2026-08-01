// dashboard.events.js

import { ViewRouter } from '../navigation/view.router.js';
import { Header } from '../layout/header.js';
import { Sidebar } from '../layout/sidebar.js';
import { Views } from '../views/views.js';

// event handling objects
import { HeaderEvents } from './header.events.js';

export const DashboardEvents = {
	init() {
		this.configureLayout();
		this.registerEvents();
	},
	configureLayout() {
		const view = ViewRouter.current;
		ViewRouter.replace(view);
		Header.configure(view);
		Sidebar.configure(view);
		Views.configure(view);
	},
	registerEvents() {
		document.addEventListener("click", this.changeView_clickEvents);
		document.addEventListener("click", HeaderEvents.previousView_clickEvents);
	},
	changeView_clickEvents(event) {
		const target = event.target.closest("[data-view]");

		if (!target) return;

		const view = target.dataset.view;
		ViewRouter.goTo(view);
	}
};