// appt.js

import { DAYS, MONTHS, getCurrentMonth, getCurrentDay, getMonthLength, getDayName } from '../utils/dates.js';
import { buildDay } from '../ui/dom.js';

const SELECTION_LIMIT = 4;
let apptInit = false;

const monthNumber = document.querySelector("#month-number");
const monthName = document.querySelector("#month-name");
const daysList = document.querySelector("#days-list");

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

		renderDays();
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

function loadCurrentMonth() {
	const month = getCurrentMonth();
	monthNumber.textContent = month + 1;
	monthName.textContent = MONTHS.get(month);
	
	renderDays();
}

function renderDays() {
	daysList.innerHTML = "";
	const month = Number(monthNumber.textContent);
	const monthLength = getMonthLength(month);
	const startDay = month === (getCurrentMonth() + 1) ?
								getCurrentDay() :
								1;

	const fragment = document.createDocumentFragment();

	for (let dayNumber = startDay; dayNumber <= monthLength; dayNumber++) {
		const dayBlock = buildDay(dayNumber, getDayName((month - 1), dayNumber));
		fragment.appendChild(dayBlock);
	}

	daysList.appendChild(fragment);
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