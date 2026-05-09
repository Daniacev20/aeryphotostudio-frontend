// main.js

//imports
import { setMenuDisplayListeners } from './ui/menu.js';
import { initApptModule } from './ui/appt.js';
import { initUserStateModule } from './state/user.js';
import {
	loadView,
	showGuestOrUserOnMenu,
	signOut
} from './features/profile/profile.views.js';


const routes = {
	"agenda.html": initApptModule,
	"perfil.html": loadView
}

// main flow
setMenuDisplayListeners(); // 1
initUserStateModule(); // 2
showGuestOrUserOnMenu(); // 3

const rawPage = window.location.href.split("/").pop();
const page = !rawPage.includes("?") ? rawPage : rawPage.substring(0, rawPage.indexOf("?")); // temporary

routes[page]?.();

