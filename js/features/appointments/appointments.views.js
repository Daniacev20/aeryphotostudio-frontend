// appointment.views.js

// dom.js

import {
	MONTHS,
	getMonthLength,
	getCurrentMonth,
	getCurrentDay,
	getDayName
} from '../../utils/dates.js';
import { makeTag } from '../../ui/dom.js';

const monthNumber = document.querySelector("#month-number");
const monthName = document.querySelector("#month-name");
const daysList = document.querySelector("#days-list");
const calendarPages = document.querySelector("#calendar-pages");

function buildDay(number, name, classIfDateSelected = "") {
	const li = makeTag("li", {
		className: "day"
	});

	const spanParent = makeTag("span");
	const spanChildren = {
		number: makeTag("span", {
			textContent: number
		}),
		dash: makeTag("span", { textContent: "-" }),
		name: makeTag("span", {
			textContent: name
		})
	}

	Object.values(spanChildren).forEach(v => {
		spanParent.appendChild(v);
	});

	li.appendChild(spanParent);

	const ol = makeTag("ol", {
		className: "hours-list"
	});

	let startTime = 9;

	for (let hour = 0; hour <= 16; hour++) {
		const timeSlot = makeTag("li");
		let time = hour + startTime;
		let minutes = hour % 2 === 0 ? "00" : "30";

		if (minutes === "00") startTime--;
		
		timeSlot.setAttribute("data-time", hour); // 0-16

		if (time < 10)
			timeSlot.textContent = `0${time}:${minutes}`;
		else
			timeSlot.textContent = `${time}:${minutes}`;

		if (classIfDateSelected)
			timeSlot.classList.add(classIfDateSelected);
		ol.appendChild(timeSlot);
	}

	li.appendChild(ol);

	return li;
}

function buildPageNumber(content, classIfActive = "") {
	const a = makeTag("a", {
		href: "#",
		textContent: content
	});

	a.setAttribute("data-day", content);

	if (classIfActive)
		a.classList.add(classIfActive);

	return a;
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

export {
	loadCurrentMonth,
	renderDay
};