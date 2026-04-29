// appt.js

import { DAYS, MONTHS, getCurrentMonth, getCurrentDay, getMonthLength, getDayName } from '../utils/dates.js';
import { buildDay, buildPageNumber } from './dom.js';

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
	});
}

function loadCurrentMonth() {
	const month = getCurrentMonth();
	monthNumber.textContent = month + 1;
	monthName.textContent = MONTHS.get(month);
	renderDay(daysList, calendarPages, month + 1, getCurrentDay());
}

function renderDay(daysBox, pagesBox, month, day) {
	// limpiar la lista actual para renderizar nueva
	daysBox.innerHTML = "";
	pagesBox.innerHTML = "";

	const dayOfWeek = getDayName(month - 1, day);
	const dayBlock = buildDay(day, dayOfWeek);
	const endOfMonth = getMonthLength(month);
	const fromDay = (month - 1) === getCurrentMonth() ? getCurrentDay() : 1;

	daysBox.appendChild(dayBlock);
	renderPages(pagesBox, fromDay, endOfMonth);
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
		addPagesLinksListeners();
		loadCurrentMonth();
		apptInit = true;
	}
}

export { initApptModule };