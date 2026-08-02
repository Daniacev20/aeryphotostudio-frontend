// view.router.js

import { ADMIN_VIEWS } from '../config/views.config.js';

export const ViewRouter = {
	get baseUrl() {
		return (
			location.origin +
			location.pathname
		);
	},

	get current() {
		const params = 
			new URLSearchParams(location.search);

		return params.get("view") ?? ADMIN_VIEWS.GALLERIES;
	},

	is(view) {
		return this.current === view;
	},

	goTo(view) {
		location.href =
			`${this.baseUrl}?view=${view}`;
	},

	previous() {
		if (document.referrer.startsWith(location.origin))
			history.back();
		else
			this.goTo(ADMIN_VIEWS.GALLERIES);
	},

	replace(view) {
		const url = `${this.baseUrl}?view=${view}`;
		history.replaceState(null, "", url);
	}
};