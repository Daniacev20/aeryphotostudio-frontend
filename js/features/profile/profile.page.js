// profile.page.js

import {
	formButtonsClickEvents,
	changeView_aClickEvents,
	ckEditChangeEvent
} from './profile.events.js';

let profilePageInit = false

 export function initProfilePage() {
	if (profilePageInit) return;

	document.addEventListener("click", formButtonsClickEvents, false);
	document.addEventListener("click", changeView_aClickEvents, false);
	document.querySelector("#ck-edit")
		?.addEventListener("change", ckEditChangeEvent, false);

	profilePageInit = true;
}