// app.js

import { setMenuDisplayListeners } from './ui/menu.js';
import { showGuestOrUserOnMenu } from './state/user.js';
import { loadView } from './features/profile/profile.views.js';
import { initProfilePage } from './features/profile/profile.page.js';
import { initAgendaModule } from './features/appointments/appointments.page.js';
import { initGalleryPage } from './features/galleries/galleries.page.js';
import { initPortfolio } from './features/galleries/portfolio.page.js';

const PAGE_ROUTES = {
	"agenda.html": initAgendaModule,
	"perfil.html": loadView,
	"entrega.html": initGalleryPage,
	"portafolio.html": initPortfolio
};

function bootstrapApp() {
	initGlobalUI();

	const page = getCurrentPage();
	PAGE_ROUTES[page]?.();
}

function initGlobalUI() {
	setMenuDisplayListeners();
	showGuestOrUserOnMenu();
	initProfilePage();
}

function getCurrentPage() {
	return window.location.pathname.split("/").pop();
}

export {
	bootstrapApp
}