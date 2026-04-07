// main app

window.addEventListener("DOMContentLoaded", async () => {
	// inicializacion de la aplicacion al cargar la pagina

	await fetchFromServer();
	renderMonth(); // mostrar el calendario del mes actual

	// DECLARACION DE VARIABLES Y CONSTANTES
	const monthSet = [
		"Enero", "Febrero", "Marzo", "Abril",
		 "Mayo", "Junio", "Julio", "Agosto", 
		 "Septiembre", "Octubre", "Noviembre", "Diciembre"];

	// objetos interactivos de la pagina
	const dateCalendar = document.getElementById("date-calendar"); // picker del calendario
	const timeSchedule = document.getElementById("time-schedule");

	// colocar valores minimo y maximo a introducir en el input-date
	dateCalendar.min = `${new Date().getFullYear()}-01-01`;
	dateCalendar.max = `${new Date().getFullYear()}-12-31`;

	// MANEJO DE EVENTOS
	
	// change: cambiar fecha calendario input-date
	dateCalendar.addEventListener("change", event => {
		// wip
	});

	// change: cambiar/seleccionar la hora
	timeSchedule.addEventListener("change", roundTime, false);

	// DEFINICION DE FUNCIONES

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

	async function fetchFromServer() {
		try {
			const response = await fetch("/api/index");
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	}
});