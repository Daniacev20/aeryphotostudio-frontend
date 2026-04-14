// profile.view.js

// users de prueba
const adminUser = JSON.parse(
	'{"name": "Davian", "username": "Dave","email": "dave@gmail.com", "password": "micasa123$", "phone": "8098098809", "isAdmin": "true"}'
);

const user = JSON.parse(
	'{"name": "Justauser", "username": "NPC","email": "justauser@gmail.com", "password": "imarobot1.0", "phone": null,"isAdmin": "false"}'
);

const views = {
	login: document.querySelector("#view-login"),
	register: document.querySelector("#view-register"),
	profile: document.querySelector("#view-profile")
}

let initialized = false;

// HELPER FUNCTIONS

function signIn(inputUser) {
	if ((user.email === inputUser.emailOrUsername.toLowerCase() ||
		user.username === inputUser.emailOrUsername) &&
			user.password === inputUser.password) {
		// login
		localStorage.setItem("user", JSON.stringify(user));
		return true;
	}
	else {
		return false;
	}
}

function signOut() {
	localStorage.clear();
	showView("login");
}

function toggleShowPassword(control) {
	control.type = control.type === "password" ? "text" : "password";
}

function showView(view) {
	Object.values(views).forEach(v => v.classList.remove("active"));

	if (view === "profile") {
		views[view].classList.add("active");
		return;
	}

	clearControls(views[view].querySelector("form"));
	views[view].classList.add("active");

	// capture the first writable element to autofocus
	const cssQuery = "input:not([type=checkbox], [type=radio], [type=submit])";
	const firstWritableElement = views[view].querySelector(cssQuery);

	// need to wait for the page to render the form
	requestAnimationFrame(() => {
		firstWritableElement?.focus();
	});
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
		if (view === "login" &&
			event.target.closest("form").id === "frm-edit-profile") {
			// when signing out from the profile view
			signOut();
			showView(view);
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
			const fullUser = JSON.parse(localStorage.getItem("user"));
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

// main function to initialize all

export function loadView() {
	if (!initialized) {
		document.querySelectorAll("form").forEach(frm => {
			frm.addEventListener("click", formButtonsClickEvents, false);
		});

		document.querySelectorAll("a[data-view]")
			.forEach(a => a.addEventListener("click", changeView_aClickEvents, false));

		document.querySelector("#ck-edit")
			.addEventListener("change", ckEditChangeEvent, false);
		
		initialized = true;
	}

	const user = JSON.parse(localStorage.getItem("user"));

	if (user) {
		showView("profile");
		loadProfile(user);
	}
	else {
		showView("login"); // default view: "login"
	}
}