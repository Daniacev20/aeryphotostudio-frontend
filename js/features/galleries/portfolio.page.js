// portfolio.page.js

import {
	getPortfolio_loadEvents
} from './portfolio.events.js';

let portfolioIsInit = false;

function initPortfolio() {
	if (portfolioIsInit) return;

	document.addEventListener(
		"DOMContentLoaded",
		getPortfolio_loadEvents,
		false
	);

	portfolioIsInit = true;
}

export {
	initPortfolio
}