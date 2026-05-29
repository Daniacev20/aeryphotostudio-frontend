// profile.events.js

import { USER_SESSION } from '../../state/user.js';
import { handleLogin } from '../auth/login.js';
import { handleLogout } from '../auth/logout.js';
import {
	showView,
	toggleShowPassword,
	clearControls,
	toggleControlsDisableStatus,
	loadProfile
} from './profile.views.js';

// inicializador: previene addEventListeners duplicados
let profileViewsInit = false;

async function changeView_aClickEvents(event) {
	const target = event.target.closest("a[data-view]");

	if (!target) return;

	const view = target.dataset.view;

	if (view) {
		if (view === "login" && USER_SESSION.user) {
			// when signing out from the profile view
			try	{
				await handleLogout();
			} catch (err) {
				console.log(err.message);
				return;
			}
		}
		
		showView(view);
	}
}

function ckEditChangeEvent(event) {
	const form = event.target.closest("form");
	toggleControlsDisableStatus(form);
}

async function formButtonsClickEvents(event) {
	const targetElement = event.target.closest("[data-behavior]");

	if (!targetElement) return;
	event.preventDefault();
	
	const behavior = targetElement.dataset.behavior;
	const currentForm = event.target.closest("form");

	
	if (behavior === "login") {
		const pError = currentForm.querySelector(".error-m");
		const userInput = {
			identifier:
				currentForm
					.querySelector("#txt-email-username-login")
					.value,
			password:
				currentForm
					.querySelector("#txt-password-login")
					.value
		};

		if (!userInput.identifier || !userInput.password) {
			pError.textContent = "Por favor, ingrese usuario y clave.";
			pError.classList.add("active");
			return;
		}

		pError.textContent = "";
		pError.classList.remove("active");

		try {
			await handleLogin(userInput);
		} catch (err) {
			pError.textContent = err.message;
			pError.classList.add("active");
			return;
		}

		showView("profile");
		loadProfile(USER_SESSION.user);
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