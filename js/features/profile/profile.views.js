// profile.views.js

import { VIEWS } from '../../conf/views.conf.js';
import { USER_SESSION } from '../../state/user.js';

function showView(view) {
	Object.values(VIEWS).forEach(v => v.classList.remove("is-active"));

	const url = new URL(location.href);
	url.searchParams.set("view", view);
	history.replaceState(null, "", url);

	if (view === "profile") {
		VIEWS[view].classList.add("is-active");
		return;
	}

	// be aware clearControls only works on
	// the first form it finds
	clearControls(VIEWS[view].querySelector("form"));
	VIEWS[view].classList.add("is-active");

	// capture first textbox to autofocus
	const cssQuery =
		"input:not([type=checkbox], [type=radio], [type=submit])";
	const firstWritableElement = VIEWS[view].querySelector(cssQuery);

	// await view rendering to autofocus
	requestAnimationFrame(() => {
		firstWritableElement?.focus();
	});
}

function toggleShowPassword(control) {
	control.type =
		control.type === "password"
		? "text"
		: "password";
}

function clearControls(form) {
	const frmControls = form.querySelectorAll("input:not([type=checkbox]), textarea");

	frmControls.forEach(c => {
		if ("value" in c) c.value = "";
	});

	const msg = form.querySelectorAll(".error-m");

	if (msg)
		msg.forEach(m => m.classList.remove("is-active"));

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

function loadView() {
	const user = USER_SESSION.user;
	const params = new URLSearchParams(location.search);
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
	showView,
	toggleShowPassword,
	clearControls,
	toggleControlsDisableStatus,
	loadProfile,
	loadView
}