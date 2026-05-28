// logout.js

import { logout } from '../../services/auth.service.js';
import { USER_SESSION } from '../../state/user.js';

export async function handleLogout() {
	await logout();
	USER_SESSION.end();
}