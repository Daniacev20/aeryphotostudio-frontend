// auth.service.js

const BASE_URL = '/api';

async function login(credentials) {
	const response = await fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(credentials)
	});

	const content = await response.json();

	if (!response.ok)
		throw new Error(content.error || 'Login failed');

	return content.data;
}

async function logout() {
	const response = await fetch(`${BASE_URL}/logout`, {
		method: 'POST',
		credentials: 'include'
	});

	const content = await response.json();

	if (!response.ok)
		throw new Error('Logout failed');

	return content.data;
}

async function getSession() {
	const response = await fetch(`${BASE_URL}/me`, {
		credentials: 'include'
	});

	if (!response.ok) return null;
	const content = await response.json();
	return content.data;
}

export {
	login,
	logout, 
	getSession
}