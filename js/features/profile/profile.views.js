// profile.js

import { VIEWS } from '../../conf/views.conf.js';
import { USER_SESSION } from '../../state/user.js';

// inicializador: previene addEventListeners duplicados
let profileViewsInit = false;

// users de prueba
const adminUser = JSON.parse(
	'{"name": "Davian", "username": "Dave","email": "dave@gmail.com", "password": "micasa123$", "phone": "8098098809", "isAdmin": "true"}'
);

const user = JSON.parse(
	'{"name": "Justauser", "username": "NPC","email": "justauser@gmail.com", "password": "imarobot", "phone": null,"isAdmin": "false"}'
);

// BORRAR AL TERMINAR DE MOVER

function getLoggedUser() {
	// wip: optimizar para usar cookies en lugar de localStorage
	// wip: recibir el token del usuario desde el servidor
	return JSON.parse(localStorage.getItem("user"));
}

function setLoggedUser(user) {
	// wip: optimizar para usar cookies en lugar de localStorage
	// wip: recibir el token del usuario desde el servidor
	localStorage.setItem("user", JSON.stringify(user));
}

function clearLoggedUser() {
	localStorage.clear();
	
}

function signIn(inputUser) {
	// wip: se necesita extraer user del servidor
	if ((user.email === inputUser.emailOrUsername.toLowerCase() ||
		user.username === inputUser.emailOrUsername) &&
			user.password === inputUser.password) {
		// login
		setLoggedUser(user);
		return true;
	}
	
	return false;
}

function signOut() {
	clearLoggedUser();
}

function showGuestOrUserOnMenu() {
	const user = getLoggedUser();
	const isUser = !!user?.name;
	const state = isUser ? "user" : "guest";
	const usernameTag = document.querySelector("[data-username]");

	const userOptions = {
		signin: document.querySelector(`[data-user-options=signin]`),
		signup: document.querySelector(`[data-user-options=signup]`),
		profile: document.querySelector(`[data-user-options=profile]`),
		signout: document.querySelector(`[data-user-options=signout]`)
	}

	const menuConfig = {
		guest: ["signin", "signup"],
		user: ["profile", "signout"]
	}

	usernameTag.textContent = isUser ? user.name : "Invitado";

	// ocultar todas las opciones dinamicas
	Object.values(userOptions).forEach(v => v.hidden = true);

	// mostrar solo las opciones dinamicas que
	// coinciden con el state
	menuConfig[state].forEach(key => {
		userOptions[key].hidden = false;
	});
}

// FUNCIONES DEL MODULO

function showView(view) {
	showGuestOrUserOnMenu();

	Object.values(VIEWS).forEach(v => v.classList.remove("active"));

	const url = new URL(window.location.href);
	url.searchParams.set("view", view);
	history.replaceState(null, "", url);

	if (view === "profile") {
		VIEWS[view].classList.add("active");
		return;
	}

	// este clearControls solo funciona en
	// el primer formulario que encuentra
	clearControls(VIEWS[view].querySelector("form"));
	VIEWS[view].classList.add("active");

	// capturar primer cuadro de texto para autoenfoque
	const cssQuery = "input:not([type=checkbox], [type=radio], [type=submit])";
	const firstWritableElement = VIEWS[view].querySelector(cssQuery);

	// esperar a que la vista cargue para el autoenfoque
	requestAnimationFrame(() => {
		firstWritableElement?.focus();
	});
}

function toggleShowPassword(control) {
	control.type = control.type === "password" ? "text" : "password";
}

function clearControls(form) {
	const frmControls = form.querySelectorAll("input:not([type=checkbox]), textarea");

	frmControls.forEach(c => {
		if ("value" in c) c.value = "";
	});

	const msg = form.querySelectorAll(".error-m");

	if (msg)
		msg.forEach(m => m.classList.remove("active"));

	frmControls[0].focus();
}

function toggleControlsDisableStatus(form) {
	const formControls = form.querySelectorAll("input:not([type=checkbox]), textarea");
	
	formControls.forEach(control => {
		if (control.type === "submit" ||
			control.type === "button") return;

		control.disabled = !control.disabled;
	});
}

function loadProfile(user) {
	const properties = ["name", "phone" ,"email", "username"];

	for (const prop of properties)
		document.querySelector(`#txt-${prop}-profile`).value = user[prop];
}

// EVENT HANLDLERS

function changeView_aClickEvents(event) {
	const target = event.target.closest("a");

	if (!target) return;

	const view = target.dataset.view;

	if (view) {
		if (view === "login" && USER_SESSION.user) {
			// when signing out from the profile view
			signOut();
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

	if (!targetElement)
		return;
	event.preventDefault();
	
	const behavior = targetElement.dataset.behavior;
	const currentForm = event.target.closest("form");

	
	if (behavior === "login") {
		const pError = currentForm.querySelector(".error-m");
		const givenUser = {
			emailOrUsername: currentForm.querySelector("#txt-email-username-login").value,
			password: currentForm.querySelector("#txt-password-login").value
		};

		if (!signIn(givenUser)) {
			pError.classList.add("active");
		}
		else {
			const fullUser = getLoggedUser();
			showView("profile");
			loadProfile(fullUser);
		}
	}
	else if (behavior === "show-password") {
		const txtPassword = targetElement.previousElementSibling;

		if (!txtPassword.type === "password" || !txtPassword.type === "text")
			return;
		toggleShowPassword(txtPassword);
	}
	else if (behavior === "clear") {
		clearControls(currentForm);
	}
	else if (behavior === "register") {
		// wip


		// debug
		// document.querySelectorAll(".error-m")
		// 	.forEach(m => m.classList.add("active"));
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

// main function to initialize perfil.html

function loadView() {
	if (!profileViewsInit) {
		document.querySelectorAll("form").forEach(frm => {
			frm.addEventListener("click", formButtonsClickEvents, false);
		});

		document.querySelectorAll("a[data-view]")
			.forEach(a => a.addEventListener("click", changeView_aClickEvents, false));

		document.querySelector("#ck-edit")
			.addEventListener("change", ckEditChangeEvent, false);

		profileViewsInit = true;
	}

	const user = USER_SESSION.user;
	const params = new URLSearchParams(window.location.href.search);
	const view = params.get("view") || "login";

	if (view === "login" || !view) {
		if (!user) {
			showView("login");
			return;
		}

		showView("profile");
		loadProfile(user);
	}
	else if (view === "register") {
		if (!user) {
			showView("register");
			return;
		}

		showView("profile");
		loadProfile(user);
	}
	else if (view === "profile") {
		if (!user) {
			showView("login");
			return;
		}

		showView("profile");
		loadProfile(user);
	}
}

export {
	signOut,
	showView,
	showGuestOrUserOnMenu,
	loadView
}