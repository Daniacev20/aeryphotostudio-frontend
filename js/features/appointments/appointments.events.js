// appointments.events.js

import {
	MONTHS,
	getCurrentMonth,
	getCurrentDay
} from '../../utils/dates.js';

import { renderDay } from './appointments.views.js';

const SELECTION_LIMIT = 2;
let apptInit = false;

const monthNumber = document.querySelector("#month-number");
const monthName = document.querySelector("#month-name");
const daysList = document.querySelector("#days-list");
const calendarPages = document.querySelector("#calendar-pages");

function changeMonth_clickEvents(event) {
	const targetBtn = event.target.closest("[data-action]");

	if (!targetBtn) return;

	const action = targetBtn.dataset.action;
	let nMonth = Number(monthNumber.textContent);
	const m = getCurrentMonth() + 1;

	if (action === "previous-month") {
		if (nMonth === m)
			return;
		monthNumber.textContent = --nMonth;
		monthName.textContent = MONTHS.get(nMonth - 1);
	}
	else if (action === "next-month") {
		if (nMonth === 12)
			return;
		monthNumber.textContent = ++nMonth;
		monthName.textContent = MONTHS.get(nMonth - 1);
	}

	const day = nMonth === m ? getCurrentDay() : 1;
	renderDay(daysList, calendarPages, nMonth, day);
}

function selectTime_clickEvents(event) {
	const timeTag = event.target.closest(".hours-list > li");
	const selected = daysList.querySelectorAll(".is-selected");

	if (!timeTag || timeTag.classList.contains("time-scheduled")) return;

	if (selected.length < SELECTION_LIMIT)
		timeTag.classList.toggle("is-selected");

	if (selected.length === SELECTION_LIMIT) {
		if (timeTag.classList.contains("is-selected"))
			timeTag.classList.remove("is-selected");
	}
}

function calendarPages_clickEvents(event) {
	const target = event.target.closest("[data-day]");

	if (!target) return;

	const dDay = Number(target.dataset.day);
	const nMonth = Number(monthNumber.textContent);
	renderDay(daysList, calendarPages, nMonth, dDay);
	
	// capturar pagina clickeada luego de crearla de nuevo
	const newPages = document.querySelectorAll("[data-day]");
	Object.values(newPages).forEach(v => {
		if (v.dataset.day == dDay) // weak "n" == n
			v.classList.add("active-page");
		else
			v.classList.remove("active-page");
	});
	
	event.preventDefault();
}

export {
	changeMonth_clickEvents,
	selectTime_clickEvents,
	calendarPages_clickEvents
}