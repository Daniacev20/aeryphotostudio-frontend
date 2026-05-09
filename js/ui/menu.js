// menu.js
// para manipular comportamientos por defecto de elementos y validaciones

let menuInit = false;

function toggleMenu(menuItems) {
	for (let item of menuItems) {
		item.style.display = item.style.display == "block" ? "none" : "block";
	}
}

function adjustMenuDisplay(menuItems) {
	for (let item of menuItems) {
		// ocultar el boton de barras y mostrar menu 
		// si la pantalla se vuelve mas ancha que la tablet mas estrecha 712px
		// este valor en la expresion debe coincidir con el media query en estilos_base.css
		item.style.display = (screen.width > 772 && screen.availWidth > 1024) ? "block" : "none";
	}
}

function setMenuDisplayListeners() {
	// capturar elementos clave, menu responsive
	const btnToggleMenu = document.querySelector("#btn-toggle");
	const menuLIs = document.querySelectorAll(".navigation-menu li");

	if (!menuInit) {
		// toggle menu al hacer click en boton hamburger
		btnToggleMenu.addEventListener("click", () => toggleMenu(menuLIs), false);

		// toggle menu al presionar una tecla en boton hamburger
		btnToggleMenu.addEventListener("keydown", () => toggleMenu(menuLIs), false);
		
		// ajustar el menu responsive conforme al ancho de pantalla
		window.addEventListener("resize", () => adjustMenuDisplay(menuLIs));

		// prevencion contra descargas de fotos
		// deshabilitar el context menu
		document.addEventListener("contextmenu", event => { event.preventDefault() });

		menuInit = true;
	}

	// deshabilitar el drag and drop de las imagenes
	document.querySelectorAll("img").forEach(img => img.draggable = false);
}

export { setMenuDisplayListeners };