// header.events.js

import { ViewRouter } from '../navigation/view.router.js';

export const HeaderEvents = {
	previousView_clickEvents(event) {
		const btnBack = event.target.closest("#btn-previous-view");

		if (!btnBack) return;

		ViewRouter.previous();
	}
};