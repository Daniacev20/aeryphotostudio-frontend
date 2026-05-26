// login.js

import { login, getSession } from '../../services/auth.service.js';
import { USER_SESSION } from '../../state/user.js';

export async function handleLogin(formData) {
	const result = await login(formData);
	const user = await getSession();

	USER_SESSION.start(user);

	return {
		message: result.data
	};
}