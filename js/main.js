// main.js

//imports
import { setMenuDisplayListeners } from './ui/menu.js';
import {
	loadView,
	showGuestOrUserOnMenu,
	signOut
} from './ui/profile.js';

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

if (/perfil.html?/.test(window.location))
	loadView();