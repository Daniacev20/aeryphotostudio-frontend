// user.js

import { menuConfig } from '../conf/menu.conf.js';

const USER_SESSION = {
	get state() {
		return getLoggedUser()?.name ? "user" : "guest";
	},

	get user() { return getLoggedUser(); },

	isAuthenticated: false,

	start(user) {
		setLoggedUser(user);
	},
	
	end() { clearLoggedUser(); }
}

function getLoggedUser() {
	// wip: optimizar para usar cookies en lugar de localStorage
	// wip: recibir el token del usuario desde el servidor
	return JSON.parse(localStorage.getItem("user"));
}

function setLoggedUser(user) {
	// wip: optimizar para usar cookies en lugar de localStorage
	// wip: recibir el token del usuario desde el servidor
	if (user) {
		USER_SESSION.isAuthenticated = true;
		localStorage.setItem("user", JSON.stringify(user));
		document.dispatchEvent(new Event("userChanged"));
	}
}

function clearLoggedUser() {
	USER_SESSION.isAuthenticated = false;
	localStorage.removeItem("user");
	document.dispatchEvent(new Event("userChanged"));
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

	usernameTag.textContent = user?.name || "Invitado";

	// ocultar todas las opciones dinamicas
	Object.values(userOptions).forEach(v => v.hidden = true);

	// mostrar solo las opciones dinamicas que
	// coinciden con el state
	menuConfig[state].forEach(key => {
		userOptions[key].hidden = false;
	});
}

export {
	showGuestOrUserOnMenu,
	USER_SESSION
}