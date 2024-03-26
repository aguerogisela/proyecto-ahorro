const contenedorOpNueva = document.getElementById("ContenedorOperacionNueva");
const contenedorGrande = document.getElementById("contendor_fbo");
const contenedorCategorias = document.getElementById("contenedor-categorias");
const contenedorReportes = document.getElementById("contenedor-reportes");
const contenedorTableBody = document.getElementById("contenedor-table-body");
const btnReportes = document.getElementById("reportesbtn");
const btnCategorias = document.getElementById("btnCategorias");
const btnBalance = document.getElementById("btnBalance");
const botonFiltro = document.getElementById("miBoton");
const divFiltro = document.getElementById("miDiv");
const menuBtn = document.getElementById("botonMenu");
const cerrarOperacion = document.getElementById("cerrarOperacion");

const menu = document.getElementById("menu");
const abrirContenedorBtn = document.getElementById("btnNuevaOperacion");
const svgWallet = document.getElementById("svgWallet");
const tableGeneral = document.getElementById("tableGeneral");
var imagenWallet = document.getElementById("imagenWallet");
const mostrarOperaciones = document.getElementById("mostrarOperaciones");

// Función para ocultar todos los contenedores excepto uno
const ocultarTodosExcepto = (contenedorMostrar) => {
	const contenedores = [
		contenedorOpNueva,
		contenedorCategorias,
		contenedorReportes,
		contenedorGrande,
	];

	// Ocultar todos los contenedores excepto el que se desea mostrar
	contenedores.forEach((contenedor) => {
		if (contenedor !== contenedorMostrar) {
			contenedor.style.display = "none";
		}
	});
};

// botón de reportes
btnReportes.addEventListener("click", () => {
	// Mostrar el contenedor de reportes
	contenedorReportes.style.display = "block";

	ocultarTodosExcepto(contenedorReportes);
});

// botón de categorías
btnCategorias.addEventListener("click", () => {
	contenedorCategorias.style.display = "block";

	ocultarTodosExcepto(contenedorCategorias);
});

// botón de balance
btnBalance.addEventListener("click", () => {
	contenedorGrande.style.display = "block";

	ocultarTodosExcepto(contenedorGrande);
});

//  abrir/cerrar contenedor de nueva operación
abrirContenedorBtn.addEventListener("click", () => {
	contenedorOpNueva.style.display = "block";
	contenedorGrande.style.display = "block";

	imagenWallet.style.display = "none";
	contenedorTableBody.style.display = "block";

	ocultarTodosExcepto(contenedorGrande);
});

// botón de mostrar operaciones
mostrarOperaciones.addEventListener("click", () => {
	// Ocultar imagen de wallet y mostrar contenedor de tabla de operaciones
	imagenWallet.style.display = "none";
	contenedorTableBody.style.display = "block";
});

// botón de cerrar operación
cerrarOperacion.addEventListener("click", () => {
	// Ocultar el contenedor de nueva operación y el contenedor grande
	contenedorOpNueva.style.display = "none";
	contenedorGrande.style.display = "block";
});

//  botón de abrir contenedor de nueva operación
abrirContenedorBtn.addEventListener("click", () => {
	// Mostrar el contenedor de nueva operación
	contenedorOpNueva.style.display = "block";

	// Ocultar los demás contenedores
	contenedorCategorias.style.display = "none";
	contenedorReportes.style.display = "none";
	contenedorGrande.style.display = "none";

	// Ocultar imagen de wallet y mostrar contenedor de tabla de operaciones
	imagenWallet.style.display = "none";
	contenedorTableBody.style.display = "block";
});

//  botón de filtro

const toggleVisibility = (elemento) => {
	elemento.style.display =
		elemento.style.display === "block" ? "none" : "block";
};
botonFiltro.addEventListener("click", () => {
	toggleVisibility(divFiltro);
	botonFiltro.innerText =
		divFiltro.style.display === "none" ? "Mostrar Filtros" : "Ocultar Filtros";
});
