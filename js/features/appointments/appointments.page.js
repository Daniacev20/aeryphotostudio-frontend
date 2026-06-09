// appointments.page.js

import { loadCurrentMonth } from './appointments.views.js';
import {
	changeMonth_clickEvents,
	selectTime_clickEvents,
	calendarPages_clickEvents
} from './appointments.events.js';

let apptInit = false;

//main module function
export function initAgendaModule() {
	if (apptInit) return;
	
	document.addEventListener("click", changeMonth_clickEvents, false);
	document.addEventListener("click", selectTime_clickEvents, false);
	document.addEventListener("click", calendarPages_clickEvents, false);

	loadCurrentMonth();
	
	apptInit = true;
}