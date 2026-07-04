// portfolio.page.js

import {
	getPortfolio_loadEvents,
	openImage_clickEvents,
	closeImage_clickEvents,
	previousImage_clickEvents,
	nextImage_clickEvents
} from './portfolio.events.js';

import { changeImage_keydownEvents } from './galleries.events.js';

import { PortfolioModal } from '../../conf/gallery.state.js';

let portfolioIsInit = false;

const galleries = document.querySelector("#galleries");

function initPortfolio() {
	if (portfolioIsInit) return;

	document.addEventListener("DOMContentLoaded", getPortfolio_loadEvents, false);
	galleries.addEventListener("click", openImage_clickEvents, false);
	PortfolioModal.dialog.addEventListener("click", closeImage_clickEvents, false);
	PortfolioModal.dialog.addEventListener("click", previousImage_clickEvents, false);
	PortfolioModal.dialog.addEventListener("click", nextImage_clickEvents, false);
	PortfolioModal.dialog.addEventListener("keydown", changeImage_keydownEvents, false);

	portfolioIsInit = true;
}

export {
	initPortfolio
}