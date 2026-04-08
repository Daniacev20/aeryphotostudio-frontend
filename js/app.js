// main app

window.addEventListener("DOMContentLoaded", async () => {
	// inicializacion de la aplicacion al cargar la pagina

	await fetchFromServer();

	// DECLARACION DE VARIABLES Y CONSTANTES
	const monthSet = new Set([
		"Enero", "Febrero", "Marzo",
		"Abril", "Mayo", "Junio", 
		"Julio", "Agosto", "Septiembre",
		"Octubre", "Noviembre", "Diciembre"
	]);

	// objetos interactivos de la pagina -wip

	// MANEJO DE EVENTOS

	// DEFINICION DE FUNCIONES

	async function fetchFromServer() {
		try {
			const response = await fetch("/api/index");

			if (response.status === 502)
				throw new Error("Could not connect to server.");

			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	}
});