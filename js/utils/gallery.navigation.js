// gallery.navigation.js

// helpers to handle session state to provide
// good dynamic navigation despite where the
// clients get to the galleries from

export function setInternalNavigation(value) {
	sessionStorage.setItem("internalNavigation", Boolean(value).toString());
}

function getInternalNavigation() {
	return sessionStorage.getItem("internalNavigation");
}

export function checkInternalNavigation() {
	return (sessionStorage.getItem("internalNavigation") === "true");
}

export function clearInternalNavigation() {
	sessionStorage.removeItem("internalNavigation", "true");
}