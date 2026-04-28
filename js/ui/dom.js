// dom.js

function buildDay(number, name, classIfDateSelected = "") {
	const li = document.createElement("li");
	li.classList.add("day");

	const spanParent = document.createElement("span");
	const spanChildren = {
		number: document.createElement("span"),
		dash: document.createElement("span"),
		name: document.createElement("span")
	}

	spanChildren.number.textContent = number;
	spanChildren.dash.textContent = "-";
	spanChildren.name.textContent = name;

	Object.values(spanChildren).forEach(v => {
		spanParent.appendChild(v);
	});

	li.appendChild(spanParent);

	const ol = document.createElement("ol");
	ol.classList.add("hours-list");

	let startTime = 9;

	for (let hour = 0; hour <= 16; hour++) {
		const timeSlot = document.createElement("li");
		let time = hour + startTime;
		let minutes = hour % 2 === 0 ? "00" : "30";

		if (minutes === "00") startTime--;
		
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
	const a = document.createElement("a");

	a.setAttribute("href", "#");
	a.setAttribute("data-day", content);
	a.textContent = content;

	if (classIfActive)
		a.classList.add(classIfActive);

	return a;
}

export { buildDay, buildPageNumber };