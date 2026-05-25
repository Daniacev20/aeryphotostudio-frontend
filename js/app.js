// app.js

import { setMenuDisplayListeners } from './ui/menu.js';
import { showGuestOrUserOnMenu } from './state/user.js';
import { loadView } from './features/profile/profile.views.js';
import { initProfileViewsListeners } from './features/profile/profile.events.js';
import { initAgendaModule } from './features/appointments/appt.page.js';

const PAGE_ROUTES = {
	"agenda.html": initAgendaModule,
	"perfil.html": loadView
};

function bootstrapApp() {
	initGlobalUI();

	const page = getCurrentPage();
	PAGE_ROUTES[page]?.();
}

function initGlobalUI() {
	setMenuDisplayListeners();
	showGuestOrUserOnMenu();
	initProfileViewsListeners();
}

function getCurrentPage() {
	return window.location.pathname.split("/").pop();
}

export {
	bootstrapApp
}