// main.js

//imports
import { setMenuDisplayListeners } from './ui/menu.js';
import {
	loadView,
	showGuestOrUserOnMenu,
	signOut
} from './ui/profile.js';
import { initApptModule } from './ui/appt.js';

const routes = {
	"agenda.html": initApptModule,
	"perfil.html": loadView
}

// event handlers
document.addEventListener("click", event => {
	const link = event.target.closest("[data-user-options=signout]");

	if (!link) return;
	event.preventDefault();
	signOut();
});

document.addEventListener("userChanged", () => {
	showGuestOrUserOnMenu();

	if (window.location.pathname.includes("perfil.html"))
		loadView();
	else
		window.location.href = "perfil.html";
});

// main flow
setMenuDisplayListeners();
showGuestOrUserOnMenu();

const page = window.location.href.split("/").pop();

routes[page]?.();

