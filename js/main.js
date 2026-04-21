// main.js

//imports
import { initEffects } from './ui/effects.js';
import {
	loadView,
	showGuestOrUserOnMenu,
	signOut
} from './ui/perfil.js';

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
initEffects();
showGuestOrUserOnMenu();

if (/perfil.html?/.test(window.location))
	loadView();