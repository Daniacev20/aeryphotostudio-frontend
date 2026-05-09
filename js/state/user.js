// user.js

import { loadView } from '../features/profile/profile.views.js';

// users de prueba
const adminUser = JSON.parse(
	'{"name": "Davian", "username": "Dave","email": "dave@gmail.com", "password": "micasa123$", "phone": "8098098809", "isAdmin": "true"}'
);

const user = JSON.parse(
	'{"name": "Justauser", "username": "NPC","email": "justauser@gmail.com", "password": "imarobot", "phone": null,"isAdmin": "false"}'
);

let userStateInit = false;

const USER_SESSION = {
	user: getLoggedUser(),
	state: !!getLoggedUser()?.name ? "user" : "guest"
}

function getLoggedUser() {
	// wip: optimizar para usar cookies en lugar de localStorage
	// wip: recibir el token del usuario desde el servidor
	return JSON.parse(localStorage.getItem("user"));
}

function setLoggedUser(user) {
	// wip: optimizar para usar cookies en lugar de localStorage
	// wip: recibir el token del usuario desde el servidor
	localStorage.setItem("user", JSON.stringify(user));
	document.dispatchEvent(new Event("userChanged"));
}

function clearLoggedUser() {
	localStorage.removeItem("user");
	document.dispatchEvent(new Event("userChanged"));
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
	const user = USER_SESSION.user;
	const state = USER_SESSION.state;
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

	usernameTag.textContent = USER_SESSION.state === "user" ? user.name : "Invitado";

	// ocultar todas las opciones dinamicas
	Object.values(userOptions).forEach(v => v.hidden = true);

	// mostrar solo las opciones dinamicas que
	// coinciden con el state
	menuConfig[state].forEach(key => {
		userOptions[key].hidden = false;
	});
}

// LISTENERS

function initUserStateModule() {
	if (!userStateInit) {
		document.addEventListener("userChanged", event => {
			showGuestOrUserOnMenu();

			if (window.location.pathname.includes("perfil.html"))
				loadView();
			else
				window.location.href = "perfil.html";
			console.log("User logged in or out.");
		});

		document.addEventListener("click", event => {
			const link = event.target.closest("[data-user-options=signout]");

			if (!link) return;
			event.preventDefault();
			signOut();
		});

		userStateInit = true;
	}
}

export {
	signIn,
	signOut,
	getLoggedUser,
	showGuestOrUserOnMenu,
	USER_SESSION,
	initUserStateModule
}