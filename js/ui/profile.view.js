// login.test.js

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
	if ((user.email === inputUser.emailOrUsername ||
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

function loginButtonsClickEvents(event) {
	event.preventDefault();

	const target = event.target.closest("button");

	if (!target) return;

	if (target.dataset.yesno == "yes") {
		const currentForm = target.closest("form");
		if (currentForm.id == "frm-login") {
			const givenUser = {
				emailOrUsername: currentForm.querySelector("#txt-email-username-login").value,
				password: currentForm.querySelector("#txt-password-login").value
			}

			if (signIn(givenUser)) 
				showView("profile");
			else
				alert("Wrong credentials");
		}
	}
	else {
		const frmLoginControls = document.querySelectorAll("#frm-login input");

		for (let c of frmLoginControls)
			if (c.value) c.value = "";
	}
}

export function loadView() {
	if (!initialized) {
		document.querySelector("#frm-login").addEventListener("click", loginButtonsClickEvents, false);
		document.querySelector("#a-sign-out").addEventListener("click", signOut, false);
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