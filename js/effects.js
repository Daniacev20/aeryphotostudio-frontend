// effects.js
// para manipular comportamientos por defecto de elementos y validaciones

window.addEventListener("load", () => {
	const btnToggleMenu = document.getElementById("btn-toggle");
	const menuLIs = document.querySelectorAll(".navigation-menu li");

	btnToggleMenu.addEventListener("click", toggleMenu, false);
	btnToggleMenu.addEventListener("keydown", toggleMenu, false);

	window.addEventListener("resize", () => {
		for (let item of menuLIs) {
			// ocultar el boton de barras y mostrar menu 
			// si la pantalla se vuelve mas ancha que la tablet mas estrecha 712px
			// este valor en la expresion debe coincidir con el media query en estilos_base.css
			item.style.display = (screen.width > 772 && screen.availWidth > 1024) ? "block" : "none";
		}
	});

	// MANEJO DE EVENTOS

	// prevencion contra descargas de fotos
	// deshabilitar el context menu
	document.addEventListener("contextmenu", event => { event.preventDefault() });

	// deshabilitar el drag and drop de las imagenes
	document.querySelectorAll("img").forEach(img => img.draggable = false);


	// DEFINICION DE FUNCIONES

	function toggleMenu() {
		for (let item of menuLIs) {
			item.style.display = item.style.display == "block" ? "none" : "block";
		}
	}
});