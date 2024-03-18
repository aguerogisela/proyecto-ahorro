const contenedorOpNueva = document.getElementById("ContenedorOperacionNueva");
const abrirContenedorBtn = document.getElementById("btnNuevaOperacion");
const contenedorGrande = document.getElementById("contendor_fbo");
const contenedorCategorias = document.getElementById("contenedor-categorias");
const btnCategorias = document.getElementById("btnCategorias");
const btnBalance = document.getElementById("btnBalance");
const cerrarOperacion = document.getElementById("cerrarOperacion");

//Botones del dom, abrir cerrar
//1. Falta menu hamburguesaconst boton = document.querySelector('#boton');

const menuBtn = document.getElementById("botonMenu");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
	console.log("me diste click");
	menu.classList.toggle("hidden");
});

// const menu = document.querySelector("#menu");

// botonMenu.addEventListener("click", () => {
// 	console.log("botonMenu");
// 	menu.classList.toggle("hidden");
// });

//2.

abrirContenedorBtn.addEventListener("click", () => {
	if (contenedorOpNueva.style.display === "block") {
		contenedorOpNueva.style.display = "none";
		contenedorGrande.style.display = "block";
	} else {
		contenedorOpNueva.style.display = "block";
		contenedorGrande.style.display = "none";
	}
});

cerrarOperacion.addEventListener("click", () => {
	if (contenedorOpNueva.style.display === "block") {
		contenedorOpNueva.style.display = "none";
		contenedorGrande.style.display = "block";
	}
});

btnCategorias.addEventListener("click", () => {
	if (contenedorCategorias.style.display === "block") {
		contenedorCategorias.style.display = "none";
		contenedorGrande.style.display = "block";
	} else {
		contenedorCategorias.style.display = "block";
		contenedorGrande.style.display = "none";
	}
});

btnBalance.addEventListener("click", () => {
	contenedorCategorias.style.display = "none";
	contenedorGrande.style.display = "block";
});

//FMOSTRAR FILTRO
const boton = document.getElementById("miBoton");
const div = document.getElementById("miDiv");

// Agregar un evento de clic al botón
boton.addEventListener("click", () => {
	// Cambiar el estilo del div para mostrarlo o ocultarlo
	if (div.style.display === "none") {
		div.style.display = "block";
		boton.innerText = "Ocultar Filtros";
	} else {
		div.style.display = "none";
		boton.innerText = "Mostrar Filtros";
	}
});
