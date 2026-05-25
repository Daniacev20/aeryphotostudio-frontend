// user.js

import { menuConfig } from '../conf/menu.conf.js';
import { _user } from './mock-users.js';

const USER_SESSION = {
	get state() {
		return getLoggedUser()?.name ? "user" : "guest";
	},
	get user() { return getLoggedUser(); },
	signIn(inputUser) {
		// wip: se necesita extraer user del servidor
		// const user = await fetch("http://userrequest")
		if ((_user.email === inputUser.emailOrUsername.toLowerCase() ||
			_user.username === inputUser.emailOrUsername) &&
				_user.password === inputUser.password) {
			// login
			setLoggedUser(_user);
			return true;
		}
		
		return false;
	},
	signOut() { clearLoggedUser(); }
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