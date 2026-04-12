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

function signIn(inputUser) {
	if ((user.email === inputUser.emailOrUsername.toLowerCase() ||
		user.username === inputUser.emailOrUsername) &&
			user.password === inputUser.password) {
		// login
		localStorage.setItem("user", user);
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

function showView(view) {
	Object.values(views).forEach(v => v.classList.remove("active"));
	views[view].classList.add("active");
}

function changeViewOnClick(event) {
	const target = event.target.closest("a");

	if (!target) return;

	if (target.dataset.view) {
		showView(target.dataset.view);
	}
}

function clearControls(form) {
	form.querySelectorAll("input, textarea").forEach(c => {
		if ("value" in c)
			c.value = "";
	});

	const p = form.querySelector(".p-error");

	if (p) p.innerText = "";

}

function formButtonsClickEvents(event) {
	event.preventDefault();

	const targetBtn = event.target.closest("button");

	if (!targetBtn) return;
	
	const behavior = targetBtn.dataset.behavior;
	const currentForm = event.target.closest("form");

	
	if (behavior === "login") {
		const pError = currentForm.querySelector("#frm-login .p-error");
		const givenUser = {
			emailOrUsername: currentForm.querySelector("#txt-email-username-login").value,
			password: currentForm.querySelector("#txt-password-login").value
		};

		if (signIn(givenUser)) 
			showView("profile");
		else
			pError.innerText = "Credenciales invalidas.";
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

export function loadView() {
	if (!initialized) {
		document.querySelectorAll("form").forEach(frm => {
			frm.addEventListener("click", formButtonsClickEvents, false);
		});
		document.querySelector("#a-sign-out")
			.addEventListener("click", signOut, false);
		document.querySelectorAll("a[data-view]")
			.forEach(a => a.addEventListener("click", changeViewOnClick, false));
		initialized = true;
	}

	const user = localStorage.getItem("user");

	if (user) {
		showView("profile");
	}
	else {
		showView("login");
	}
}