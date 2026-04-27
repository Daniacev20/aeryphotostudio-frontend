// dates.js

const DAYS = new Map([
	[0, "Domingo"],
	[1, "Lunes"],
	[2, "Martes"],
	[3, "Miercoles"],
	[4, "Jueves"],
	[5, "Viernes"],
	[6, "Sabado"]
]);

const MONTHS = new Map([
	[0, "Enero"],
	[1, "Febrero"],
	[2, "Marzo"],
	[3, "Abril"],
	[4, "Mayo"],
	[5, "Junio"],
	[6, "Julio"],
	[7, "Agosto"],
	[8, "Septiembre"],
	[9, "Octubre"],
	[10, "Noviembre"],
	[11, "Diciembre"]
]);

function getCurrentMonth() {
	return new Date().getMonth();
}

function getCurrentDay() {
	return new Date().getDate();
}

function getMonthLength(month) {
	const d = new Date();
	return new Date(d.getFullYear(), month, 0).getDate();
}

function getDayName(month, day) {
	const d = new Date();
	const dayOfWeek = new Date(d.getFullYear(), month, day).getDay();
	return DAYS.get(dayOfWeek);
}

export {
	DAYS,
	MONTHS,
	getCurrentMonth,
	getCurrentDay,
	getMonthLength,
	getDayName
};