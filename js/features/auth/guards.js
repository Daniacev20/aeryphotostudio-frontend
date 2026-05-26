// guards.js

import { getSession } from '../../services/auth.service.js';
import { USER_SESSION } from '../../state/user.js';

async function hydrateSession() {
	const user = await getSession();

	if (user) {
		USER_SESSION.start(user);
	}
	else {
		USER_SESSION.end();
	}
}

export {
	hydrateSession
}