// main app

window.addEventListener("DOMContentLoaded", () => {
	// inicializacion de la aplicacion al cargar la pagina

	renderMonth(); // mostrar el calendario del mes actual

	// DECLARACION DE VARIABLES Y CONSTANTES
	const monthSet = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

	// objetos interactivos de la pagina
	const timeSchedule = document.getElementById("time-schedule");
	const dateCalendar = document.getElementById("date-calendar"); // picker del calendario
	const calendarHeader = document.querySelector(".calendar-header"); // contenedor de los botones para cambiar de mes
	const spanMonthNumber = document.getElementById("month-number"); // etiqueta del numero del mes
	const spanMonthName = document.getElementById("month-name"); // etiqueta del nombre del mes
	const daysContainer = document.getElementById("days-container"); // contenedor de los dias del mes generados dinamicamente

	// colocar valores minimo y maximo a introducir en el input-date
	dateCalendar.min = `${new Date().getFullYear()}-01-01`;
	dateCalendar.max = `${new Date().getFullYear()}-12-31`;

	// MANEJO DE EVENTOS
	
	// change: cambiar fecha calendario input-date
	dateCalendar.addEventListener("change", event => {
		let fromDate = new Date(dateCalendar.valueAsDate);
		let firstDayOffset = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1).getDay();
		spanMonthNumber.innerText = fromDate.getMonth() + 1;
		spanMonthName.innerText = monthSet[fromDate.getMonth()];

		renderMonth(Number(spanMonthNumber.innerText));

		const dias = document.querySelectorAll(".calendar-day");
		dias[fromDate.getDate() + firstDayOffset].classList.add("day-selected");
	});

	// click: botones mes anterior y siguiente
	calendarHeader.addEventListener("click", event => {
		const button = event.target.closest("button"); // botones

		if (!button || !calendarHeader.contains(button)) { return; }
		else {
			// ocurre al presionar un elemento button
			let currentMonthNumber = Number(spanMonthNumber.innerText);
			
			if (button.classList.contains("previous-month")) {
				// ocurre al presionar el boton mes anterior
				if (currentMonthNumber == 1)
					currentMonthNumber = monthSet.length;
				else
					currentMonthNumber--;
				
			}
			else if (button.classList.contains("next-month")) {
				// ocurre al presionar el boton mes siguiente
				if (currentMonthNumber == monthSet.length)
					currentMonthNumber = 1;
				else
					currentMonthNumber++;
			}

			spanMonthNumber.innerText = currentMonthNumber;
			spanMonthName.innerText = monthSet[currentMonthNumber - 1];

			renderMonth(currentMonthNumber);
		}
	});

	// click: contenedor dias, para seleccionar fechas del calendario dinamico
	daysContainer.addEventListener("click", event => {
		const element = event.target.closest("div");
		const previouslySelected = daysContainer.querySelector(".day-selected");

		if (previouslySelected && previouslySelected != element)
			previouslySelected.classList.remove("day-selected");

		if (!element.classList.contains("day-scheduled") && element.innerText != "") {
			element.classList.add("day-selected");

			const currentDate = new Date();
			const selectedDate = new Date(currentDate.getFullYear(), (spanMonthNumber.innerText - 1), element.innerText);

			dateCalendar.valueAsDate = selectedDate;	
		}
	});

	// change: cambiar/seleccionar la hora

	timeSchedule.addEventListener("change", roundTime, false);

	// DEFINICION DE FUNCIONES

	function renderMonth(monthNumber) {
		const daysContainer = document.getElementById("days-container");
		const now = new Date();
		let month = monthNumber - 1 || now.getMonth();
		const monthTotalDays = new Date(now.getFullYear(), month + 1, 0).getDate();
		const monthStartDay = new Date(now.getFullYear(), month).getDay();

		// limpiar el calendario antes de renderizar
		daysContainer.innerHTML = "";

		// crea los cuadros con los dias del mes segun el calendario
		for (let i = 0; i < (monthTotalDays + monthStartDay); i++) {
			let newDiv = document.createElement("div");
			newDiv.className = "calendar-day";

			// crea los rellenos si el mes no empieza en domingo
			if (i < monthStartDay) {
				newDiv.classList.add("day-scheduled");
			}
			else {
				let txt = document.createTextNode(i + 1 - monthStartDay);
				newDiv.appendChild(txt);
			}

			daysContainer.appendChild(newDiv);
		}
	}

	function roundTime() {
		let value = timeSchedule.value;
		const dateToSet = new Date();
		let hours = Number(value.substring(0, value.indexOf(":")));
		let minutes = Number(value.substring(value.indexOf(":") + 1, value.length));

		if (hours < 8) dateToSet.setHours(8);
		else if (hours > 20) dateToSet.setHours(20);
		else dateToSet.setHours(hours);

		if ((minutes > 0 && minutes <= 15)) dateToSet.setMinutes(0);
		else if (minutes > 15 && minutes != 30) dateToSet.setMinutes(30);
		else dateToSet.setMinutes(minutes);

		timeSchedule.value = `${dateToSet.getHours()}:${dateToSet.getMinutes()}`;
	}
});

async function fetchFromServer() {
	try {
		const response = await fetch("/api/index").json();
		console.log(JSON.stringify(response));
	} catch (err) {
		console.error(err);
	}

}