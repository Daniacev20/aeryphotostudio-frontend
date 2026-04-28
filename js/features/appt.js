// appt.js

import { DAYS, MONTHS, getCurrentMonth, getCurrentDay, getMonthLength, getDayName } from '../utils/dates.js';
import { buildDay, buildPageNumber } from '../ui/dom.js';

const SELECTION_LIMIT = 4;
let apptInit = false;

const monthNumber = document.querySelector("#month-number");
const monthName = document.querySelector("#month-name");
const daysList = document.querySelector("#days-list");
const calendarPages = document.querySelector("#calendar-pages");

function addMonthBannerListeners() {
	const monthBanner = document.querySelector("#month-controls");
	
	monthBanner.addEventListener("click", event => {
		const targetBtn = event.target.closest("[data-action]");

		if (!targetBtn) return;
		const action = targetBtn.dataset.action;
		let nMonth = Number(monthNumber.textContent);

		if (action === "previous-month") {
			const m = getCurrentMonth() + 1;

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

		renderDay();
	});
}

function addDaysListListeners() {
	daysList.addEventListener("click", event => {
		const timeTag = event.target.closest(".hours-list > li");
		const selected = daysList.querySelectorAll(".time-selected");

		if (!timeTag) return;

		if (selected.length < SELECTION_LIMIT)
			timeTag.classList.toggle("time-selected");

		if (selected.length === SELECTION_LIMIT) {
			if (timeTag.classList.contains("time-selected"))
				timeTag.classList.remove("time-selected");
		}
	});
}

function addPagesLinksListeners() {
	calendarPages.addEventListener("click", event => {
		const target = event.target.closest("[data-day]");
		// wip
	});
}

function loadCurrentMonth() {
	const month = getCurrentMonth();
	monthNumber.textContent = month + 1;
	monthName.textContent = MONTHS.get(month);
	renderDay();
}

function renderDay(day) {
	// limpiar la lista actual para renderizar nueva
	daysList.innerHTML = "";
	calendarPages.innerHTML = "";

	const month = Number(monthNumber.textContent);
	const endOfMonth = getMonthLength(month);
	const startDay = month === (getCurrentMonth() + 1) ? getCurrentDay() : 1;
	const dayOfWeek = getDayName((month - 1), startDay);
	const firstDayBlock = buildDay(startDay, dayOfWeek);

	daysList.appendChild(firstDayBlock);
	renderPages(calendarPages, startDay, endOfMonth);
}

function renderPages(parent, fromDay, toDay) {	
	const fragment = document.createDocumentFragment();

	for (let dayNumber = fromDay; dayNumber <= toDay; dayNumber++) {
		const a = buildPageNumber(dayNumber);

		if (dayNumber === fromDay)
			a.classList.add("active-page");
		fragment.appendChild(a);
	}

	parent.appendChild(fragment);
}

//main module function
function initApptModule() {
	if (!apptInit) {
		addMonthBannerListeners();
		addDaysListListeners();
		loadCurrentMonth();

		apptInit = true;
	}
}

export { initApptModule };