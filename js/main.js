// main.js

//imports
import { initEffects } from './ui/effects.js';
import {
	loadView,
	showGuestOrUserOnMenu,
	signOut
} from './ui/profile.view.js';

// event handlers
document.addEventListener("click", event => {
	const link = event.target.closest("[data-user-options=signout]");

	if (!link) return;
	event.preventDefault();
	signOut();
});

// main flow
initEffects();
showGuestOrUserOnMenu();

if (/perfil.html?/.test(window.location)) loadView();

