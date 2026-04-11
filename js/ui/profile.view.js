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

function loginButtonsClickEvents(event) {
	event.preventDefault();

	const target = event.target.closest("button");
	const currentForm = event.target.closest("form");

	if (!target) return;
	
	if (currentForm.id == "frm-login") {
		const pError = currentForm.querySelector("#frm-login .p-error");
		const givenUser = {
			emailOrUsername: currentForm.querySelector("#txt-email-username-login").value,
			password: currentForm.querySelector("#txt-password-login").value
		};
		
		if (target.dataset.yesno == "yes") {
			if (signIn(givenUser)) 
				showView("profile");
			else
				pError.innerText = "Credenciales invalidas.";
		}
		else {
			const frmLoginControls = document.querySelectorAll("#frm-login input");

			pError.innerText = "";
			for (let c of frmLoginControls)
				if (c.value) c.value = "";
		}
	}
}

export function loadView() {
	if (!initialized) {
		document.querySelector("#frm-login")
			.addEventListener("click", loginButtonsClickEvents, false);
		document.querySelector("#a-sign-out")
			.addEventListener("click", signOut, false);
		[...document.querySelectorAll("a[data-view]")]
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