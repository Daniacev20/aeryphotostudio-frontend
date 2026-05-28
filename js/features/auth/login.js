// login.js

import { login, getMe } from '../../services/auth.service.js';
import { hydrateSession } from './guards.js';

export async function handleLogin(formData) {
	await login(formData);
	await hydrateSession();
}