// Función genérica para cambiar la visibilidad de un elemento
const toggleVisibility = (elemento) => {
	elemento.style.display =
		elemento.style.display === "block" ? "none" : "block";
};

// Obtener referencias a los elementos del DOM
const contenedorOpNueva = document.getElementById("ContenedorOperacionNueva");
const contenedorGrande = document.getElementById("contendor_fbo");
const contenedorCategorias = document.getElementById("contenedor-categorias");
const cerrarOperacion = document.getElementById("cerrarOperacion");
const btnCategorias = document.getElementById("btnCategorias");
const btnBalance = document.getElementById("btnBalance");
const botonFiltro = document.getElementById("miBoton");
const divFiltro = document.getElementById("miDiv");
const menuBtn = document.getElementById("botonMenu");
const menu = document.getElementById("menu");
const abrirContenedorBtn = document.getElementById("btnNuevaOperacion");

// Manejar el click en el botón del menú
menuBtn.addEventListener("click", () => {
	menu.classList.toggle("hidden");
});

// Manejar el click en el botón de abrir/cerrar contenedor de nueva operación
abrirContenedorBtn.addEventListener("click", () => {
	toggleVisibility(contenedorOpNueva);
	toggleVisibility(contenedorGrande);
});

// Manejar el click en el botón de cerrar operación
cerrarOperacion.addEventListener("click", () => {
	toggleVisibility(contenedorOpNueva);
	toggleVisibility(contenedorGrande);
});

// Manejar el click en el botón de categorías
btnCategorias.addEventListener("click", () => {
	toggleVisibility(contenedorCategorias);
	toggleVisibility(contenedorGrande);
});

// Manejar el click en el botón de balance
btnBalance.addEventListener("click", () => {
	contenedorCategorias.style.display = "none";
	contenedorGrande.style.display = "block";
});

// Manejar el click en el botón de filtro
botonFiltro.addEventListener("click", () => {
	toggleVisibility(divFiltro);
	botonFiltro.innerText =
		divFiltro.style.display === "none" ? "Mostrar Filtros" : "Ocultar Filtros";
});
