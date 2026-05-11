// main.js

//imports
import { setMenuDisplayListeners } from './ui/menu.js';
import { initApptModule } from './ui/appt.js';
import { showGuestOrUserOnMenu } from './state/user.js';
import { loadView } from './features/profile/profile.views.js';

const routes = {
	"agenda.html": initApptModule,
	"perfil.html": loadView
}

// main flow
setMenuDisplayListeners();
showGuestOrUserOnMenu();

const page = window.location.pathname.split("/").pop();
routes[page]?.();