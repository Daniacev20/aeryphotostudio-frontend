// logout.js

import { logout } from '../../services/auth.service.js';
import { USER_SESSION } from '../../state/user.js';

export async function handleLogout() {
	try {
		const result = await logout();

		USER_SESSION.end();

		return {
			success: true,
			user: result.data
		};
	}
	catch (error) {
		return {
			success: false,
			message: error.message
		};
	}
}