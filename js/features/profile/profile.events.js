// profile.events.js

import { USER_SESSION } from '../../state/user.js';
import {
	showView,
	toggleShowPassword,
	clearControls,
	toggleControlsDisableStatus,
	loadProfile
} from './profile.views.js';

// inicializador: previene addEventListeners duplicados
let profileViewsInit = false;

function changeView_aClickEvents(event) {
	const target = event.target.closest("a[data-view]");

	if (!target) return;

	const view = target.dataset.view;

	if (view) {
		if (view === "login" && USER_SESSION.user) {
			// when signing out from the profile view
			USER_SESSION.signOut();
		}
		else {
			// when going to any view from anywhere else
			showView(view);
		}
	}
}

function ckEditChangeEvent(event) {
	const form = event.target.closest("form");
	toggleControlsDisableStatus(form);
}

function formButtonsClickEvents(event) {
	const targetElement = event.target.closest("[data-behavior]");

	if (!targetElement) return;
	event.preventDefault();
	
	const behavior = targetElement.dataset.behavior;
	const currentForm = event.target.closest("form");

	
	if (behavior === "login") {
		const pError = currentForm.querySelector(".error-m");
		const givenUser = {
			emailOrUsername: currentForm.querySelector("#txt-email-username-login").value,
			password: currentForm.querySelector("#txt-password-login").value
		};

		if (!USER_SESSION.signIn(givenUser)) {
			pError.classList.add("active");
		}
		else {
			const fullUser = USER_SESSION.user;
			showView("profile");
			loadProfile(fullUser);
		}
	}
	else if (behavior === "show-password") {
		const txtPassword = targetElement.previousElementSibling;

		if (txtPassword.type !== "password" && txtPassword.type !== "text")
			return;
		toggleShowPassword(txtPassword);
	}
	else if (behavior === "clear") {
		clearControls(currentForm);
	}
	else if (behavior === "register") {
		// wip

		console.log("Register behavior handler.");
	}
	else if (behavior === "save") {
		// wip
		console.log("Save behavior handler.");
	}
	else if (behavior === "discard") {
		// wip
		console.log("Discard behavior handler.");
	}
}

function initProfileViewsListeners() {
	if (profileViewsInit) return;

	document.addEventListener("click", formButtonsClickEvents, false);
	document.addEventListener("click", changeView_aClickEvents, false);
	document.querySelector("#ck-edit")
		?.addEventListener("change", ckEditChangeEvent, false);

	profileViewsInit = true;
}

export {
	initProfileViewsListeners
}