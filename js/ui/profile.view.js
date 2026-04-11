// login.test.js

// users de prueba
const adminUser = '{"name": "Davian", "username": "Dave","email": "dave@gmail.com", "phone": "8098098809", "isAdmin": "true"}'
const user = '{"name": "Justauser", "username": "NPC","email": "justauser@gmail.com","phone": null,"isAdmin": "false"}';
const views = {
	login: document.querySelector("#view-login"),
	register: document.querySelector("#view-register"),
	profile: document.querySelector("#view-profile")
}

let initialized = false;

export function setUser() {
	localStorage.setItem("user", user);
}

export function removeUser() {
	localStorage.removeItem("user");
}

function showView(view) {
	Object.values(views).forEach(v => v.classList.remove("active"));
	views[view].classList.add("active");
}

function handleClick(event) {
	const target = event.target.closest("button");

	if (!target) return;

	if (target.dataset.yesno == "yes")
		setUser();
	else
		removeUser();
}

export function loadView() {
	if (!initialized) {
		document.addEventListener("click", handleClick, false);
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