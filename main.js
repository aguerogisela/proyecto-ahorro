//**********  SECCION OPERACIONES **************
let operacionEditandoId = null;
let arrayOperaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

console.log(arrayOperaciones);
//// Funciones para manejar operaciones
const eventosEditarOperaciones = (elementos) => {
	elementos.forEach((elemento) => {
		const idOp = elemento.getAttribute("dataOp-id");
		elemento.addEventListener("click", () => {
			operacionEditandoId = idOp;
			const operacion = arrayOperaciones.find((op) => op.idOp === idOp);

			document.getElementById("description").value = operacion.descripcion;
			document.getElementById("category").value = operacion.categoria;
			document.getElementById("date").value = operacion.fecha;
			document.getElementById("amount").value = operacion.monto;

			// Muestra el contenedor de la nueva operación

			contenedorOpNueva.classList.remove("hidden");
		});
		//*********** ELIMINAR  DEL ARRAY ***********/

		const eliminarEnlaceOp = document.getElementById(`eliminarOp-${idOp}`);
		eliminarEnlaceOp.addEventListener("click", () => {
			const modal = document.getElementById("myModal");
			modal.classList.remove("hidden");

			const confirmarEliminarBtn = document.getElementById("confirmarEliminar");
			confirmarEliminarBtn.onclick = function () {
				modal.classList.add("hidden");

				const index = arrayOperaciones.findIndex((op) => op.idOp === idOp);
				arrayOperaciones.splice(index, 1);

				generarTabla(arrayOperaciones);

				localStorage.setItem("operaciones", JSON.stringify(arrayOperaciones));
			};

			const cancelarEliminarBtn = document.getElementById("cancelarEliminar");
			cancelarEliminarBtn.onclick = function () {
				modal.classList.add("hidden");
			};
		});
	});
};

// Código para generar la tabla de operaciones
const tablaBody = document.getElementById("table-body");

const generarTabla = (arrayOperaciones) => {
	tablaBody.innerHTML = "";
	let totalGanancias = 0;
	let totalGastos = 0;

	arrayOperaciones.forEach((operacion) => {
		const { descripcion, categoria, fecha, monto, idOp } = operacion;
		const colorClase = parseInt(monto) > 0 ? "text-green-500" : "text-red-500";

		tablaBody.innerHTML += `   <div class="flex flex-wrap sm:flex-no-wrap space-x-1">
    <div class="pl-4  font-bold px-2 py-1 whitespace-no-wrap text-sm leading-5 text-violet-700		 flex-1">${descripcion}</div>
    <div class="pl-4 px-2 py-1  text-sm leading-5 text-gray-500 flex-1 text-fuchsia-400 font-bold">${categoria}</div>
    <div class="pl-4 px-2 py-1  text-sm leading-5 text-gray-500 flex-1 hidden lg:flex">${fecha}</div>
    <div class="pl-4 px-2 py-1 text-sm leading-5 ${colorClase} flex-1 font-bold">${monto}</div>
    <div class="pl-4 px-2 py-1  text-sm leading-5 font-medium flex-1">
        <a href="javascript:void(0)" class="text-indigo-600 hover:text-indigo-900 mr-2 boton-editar-operacion" dataOp-id="${idOp}">
            <i class="far fa-edit"></i>
        </a>
        <a href="javascript:void(0)" id="eliminarOp-${idOp}" class="text-red-600 hover:text-red-900 boton-eliminar-operacion">
            <i class="far fa-trash-alt"></i>
        </a>
    </div>
</div>`;

		// Sumar el monto a las ganancias o gastos dependiendo del tipo
		if (parseFloat(monto) > 0) {
			totalGanancias += parseFloat(monto);
		} else {
			totalGastos += parseFloat(monto);
		}
	});

	eventosEditarOperaciones(
		document.querySelectorAll(".boton-editar-operacion")
	);

	// Actualizar los elementos del balance con los totales calculados
	const gananciasElement = document.getElementById("ganancia");
	const gastosElement = document.getElementById("gastos");
	const totalElement = document.getElementById("total");

	gananciasElement.textContent = `+ $${totalGanancias.toFixed(2)}`;
	gastosElement.textContent = `- $${Math.abs(totalGastos).toFixed(2)}`;
	totalElement.textContent = `$${(totalGanancias + totalGastos).toFixed(2)}`;

	// Mostrar los reportes
	mostrarReportes(totalGanancias, totalGastos);
};

// Código para mostrar los reportes de ganancias y gastos por categoría
const mostrarReportes = (totalGanancias, totalGastos) => {
	// objeto para almacenar los totales por categoría
	const totalesPorCategoria = {};

	//  totales por categoría
	arrayOperaciones.forEach((operacion) => {
		const { categoria, monto } = operacion;
		// Verifica si la categoría ya existe en el objeto, si no, inicializar los totales en 0
		if (!totalesPorCategoria[categoria]) {
			totalesPorCategoria[categoria] = { ganancia: 0, gasto: 0 };
		}
		// Suma el monto de la operación al total correspondiente (ganancia o gasto) de la categoría
		if (parseFloat(monto) > 0) {
			totalesPorCategoria[categoria].ganancia += parseFloat(monto);
		} else {
			totalesPorCategoria[categoria].gasto += parseFloat(monto);
		}
	});

	// mostrar los reportes por categoría
	let reportesPorCategoriaHTML =
		'<div class="bg-gray-100 rounded-lg shadow-lg p-6 mb-6">';
	reportesPorCategoriaHTML +=
		'<h2 class="text-xl font-bold mb-2">Reportes por categoría</h2>';
	for (const categoria in totalesPorCategoria) {
		const { ganancia, gasto } = totalesPorCategoria[categoria];
		reportesPorCategoriaHTML += `
            <div class="flex justify-between mb-2">
                <p class="text-gray-600">${categoria}</p>
                <div class="flex">
                    <p class="mr-2">Ganancia:</p>
                    <p class="${
											ganancia >= 0 ? "text-green-500" : "text-red-500"
										} font-semibold">${ganancia.toFixed(2)}</p>
                    <p class="mx-2">Gasto:</p>
                    <p class="${
											gasto >= 0 ? "text-green-500" : "text-red-500"
										} font-semibold">${Math.abs(gasto).toFixed(2)}</p>
                </div>
            </div>`;
	}
	reportesPorCategoriaHTML += "</div>";

	// Mostrar los reportes por categoría
	const contenedorReportes = document.getElementById("contenedor-reportes");
	contenedorReportes.innerHTML = reportesPorCategoriaHTML;

	// Mostrar también los totales generales
	const balanceTotalHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-2">Balance total</h2>
            <div class="flex justify-between">
                <p class="text-gray-600">Ganancia total</p>
                <p class="text-green-500 font-semibold">+ $${totalGanancias.toFixed(
									2
								)}</p>
            </div>
            <div class="flex justify-between">
                <p class="text-gray-600">Gasto total</p>
                <p class="text-red-500 font-semibold">- $${Math.abs(
									totalGastos
								).toFixed(2)}</p>
            </div>
            <div class="flex justify-between">
                <p class="text-gray-600">Balance total</p>
                <p class="font-semibold">$${(
									totalGanancias + totalGastos
								).toFixed(2)}</p>
            </div>
        </div>`;
	contenedorReportes.insertAdjacentHTML("beforeend", balanceTotalHTML);
};

// Función para agregar una nueva operación
const agregarOperacion = () => {
	const descripcion = document.getElementById("description").value;
	const categoria = document.getElementById("category").value;
	const fecha = document.getElementById("date").value;
	const monto = document.getElementById("amount").value;
	const tipo = document.getElementById("filtro-tipo").value;
	const idOp = uuidv4();

	// Actualiza el gasto o la ganancia de la categoría correspondiente
	const categoriaIndex = arrayCategorias.findIndex(
		(cat) => cat.nombre === categoria
	);
	if (tipo === "Gasto") {
		arrayCategorias[categoriaIndex].gasto += parseFloat(monto);
	} else {
		arrayCategorias[categoriaIndex].ganancia += parseFloat(monto);
	}

	if (operacionEditandoId) {
		const index = arrayOperaciones.findIndex(
			(op) => op.idOp === operacionEditandoId
		);
		arrayOperaciones[index] = {
			idOp: operacionEditandoId,
			descripcion: descripcion,
			categoria: categoria,
			fecha,
			monto: monto,
		};
		operacionEditandoId = null;
	} else {
		const nuevaOperacion = {
			idOp: idOp,
			descripcion: descripcion,
			monto: monto,
			categoria: categoria,
			// tipo,
			fecha: fecha,
		};
		arrayOperaciones.push(nuevaOperacion);
	}

	generarTabla(arrayOperaciones);

	document.getElementById("description").value = "";
	document.getElementById("category").value = "";
	document.getElementById("date").value = "";
	document.getElementById("amount").value = "";

	// Guardar los datos actualizados en el localStorage
	localStorage.setItem("operaciones", JSON.stringify(arrayOperaciones));
};

// Agregar un evento de clic al botón "Agregar Operación"
document
	.getElementById("agregarOperacion")
	.addEventListener("click", agregarOperacion);

// Generar la tabla al cargar la página
generarTabla(arrayOperaciones);

//******************  SECCION CATEGORÍA ********************

// Variables globales
let categoriaEditandoId = null;

// Funciones para manejar categorías

const eventosEditarCategoria = (elementos) => {
	elementos.forEach((elemento) => {
		const id = elemento.getAttribute("data-id");

		elemento.addEventListener("click", () => {
			categoriaEditandoId = id; // Guardar el ID de la categoría que se está editando
			const categoria = arrayCategorias.find((cat) => cat.id === id);
			document.getElementById("editar-categoria-input").value =
				categoria.nombre;
		});

		const eliminarEnlace = document.getElementById(`eliminar-${id}`);
		eliminarEnlace.addEventListener("click", () => {
			// Mostrar la modal de confirmación
			const modal = document.getElementById("myModalCat");
			modal.classList.remove("hidden");

			// Asignar evento al botón de confirmar eliminar en la modal
			const confirmarEliminarBtn = document.getElementById(
				"confirmarEliminarCat"
			);
			confirmarEliminarBtn.onclick = function () {
				// Ocultar la modal
				modal.classList.add("hidden");

				// Eliminar la categoría
				const index = arrayCategorias.findIndex((cat) => cat.id === id);
				arrayCategorias.splice(index, 1);

				// Volver a cargar la tabla
				cargarTabla(arrayCategorias);

				// Opcional: Guardar el array actualizado en el almacenamiento local
				localStorage.setItem("categorias", JSON.stringify(arrayCategorias));
			};

			// Asignar evento al botón de cancelar eliminar en la modal
			const cancelarEliminarBtn = document.getElementById(
				"cancelarEliminarCat"
			);
			cancelarEliminarBtn.onclick = function () {
				// Ocultar la modal
				modal.classList.add("hidden");
			};
		});
	});
};

// Código para cargar la tabla de categorías
const tablaCategoria = document.getElementById("table-categoria");

const cargarTabla = (data) => {
	tablaCategoria.innerHTML = "";
	data.forEach((categoria) => {
		const { id, nombre } = categoria;
		tablaCategoria.innerHTML += `<tr class="bg-white">
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">${nombre}</td>
                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <a href="javascript:void(0)" class="text-indigo-600 hover:text-indigo-900 mr-4 boton-editar-categoria" data-id="${id}">
                        <i class="far fa-edit"></i>
                    </a>
                    <a href="javascript:void(0)" id="eliminar-${id}" class="text-red-600 hover:text-red-900 boton-eliminar-categoria">
                        <i class="far fa-trash-alt"></i>
                    </a>
                </td>
            </tr>`;
	});
	eventosEditarCategoria(document.querySelectorAll(".boton-editar-categoria"));
};

// Código para agregar una nueva categoría

const agregarCategoria = () => {
	const nombreCategoria = document.getElementById(
		"editar-categoria-input"
	).value;

	if (categoriaEditandoId) {
		const index = arrayCategorias.findIndex(
			(cat) => cat.id === categoriaEditandoId
		);
		arrayCategorias[index].nombre = nombreCategoria;
		categoriaEditandoId = null;
	} else {
		// Si no hay un ID de categoría guardado, estamos agregando una nueva categoría
		const nuevaCategoria = {
			id: uuidv4(),
			nombre: nombreCategoria,
		};
		arrayCategorias.push(nuevaCategoria);
	}

	cargarTabla(arrayCategorias);

	document.getElementById("editar-categoria-input").value = "";
	localStorage.setItem("categorias", JSON.stringify(arrayCategorias));
};

// Event listeners y generación inicial de la tabla
document
	.getElementById("agregar-categoria-btn")
	.addEventListener("click", agregarCategoria);
cargarTabla(arrayCategorias);

// ***************** FILTROS **********************

//FILTRO MONTO
const ordenarPorSelect = document.getElementById("ordenarPor");

ordenarPorSelect.addEventListener("change", filtrarPorMonto);

function filtrarPorMonto() {
	const valorSeleccionado = ordenarPorSelect.value;

	const filasTabla = document.querySelectorAll("#table-body div");

	filasTabla.forEach((fila) => {
		const montoElement = fila.querySelector("div:nth-child(4)"); // Utilizar td:nth-child(4) para el cuarto td
		if (montoElement) {
			const monto = parseFloat(montoElement.textContent.replace("$", ""));

			if (valorSeleccionado === "mayor_monto" && monto < 0) {
				fila.style.display = "none";
			} else if (valorSeleccionado === "menor_monto" && monto >= 0) {
				fila.style.display = "none";
			} else {
				fila.style.display = "";
			}
		}
	});
}

function filtrarPorAZ() {
	letraSeleccionada = ordenarPorSelect;
	const filasTabla = document.querySelectorAll("#table-body div");

	filasTabla.forEach((fila) => {
		const descripcionElemento = fila.querySelector("div:nth-child(4)");
		if (descripcionElemento) {
			const descripcionEl = parseFloat(descripcionElemento.textContent);
		}
	});
}

////FILTRAR POR CATEGORIA

const filtroCategoria = document.getElementById("filtro-cate");

filtroCategoria.addEventListener("change", filtrarPorCategoria);

function filtrarPorCategoria() {
	const categoriaSeleccionada = filtroCategoria.value;

	const filasTabla = document.querySelectorAll("#table-body div");

	filasTabla.forEach((fila) => {
		const categoriaElemento = fila.querySelector("div:nth-child(2)");
		if (categoriaElemento) {
			const categoria = categoriaElemento.textContent;

			if (
				categoriaSeleccionada !== "Todas" &&
				categoria !== categoriaSeleccionada
			) {
				fila.style.display = "none";
			} else {
				fila.style.display = "";
			}
		}
	});
}

const filtroTipo = document.getElementById("filtros-gasto");

filtroTipo.addEventListener("change", filtroPorTipo);

function filtroPorTipo() {
	const filtroTipoSeleccionado = filtroTipo.value;

	const filasTabla = document.querySelectorAll("#table-body div");

	filasTabla.forEach((fila) => {
		const tipoElemento = fila.querySelector("div:nth-child(1)");
		if (tipoElemento) {
			const tipo = tipoElemento.textContent;

			if (
				filtroTipoSeleccionado !== "Todos" &&
				tipo !== filtroTipoSeleccionado
			) {
				fila.style.display = "none";
			} else {
				fila.style.display = "";
			}
		}
	});
}

const filtroTipoSelect = document.getElementById("filtro-tipo");

// Agregar evento de cambio al select
filtroTipoSelect.addEventListener("change", function () {
	const tipoSeleccionado = filtroTipoSelect.value;

	const montoInput = document.getElementById("amount");

	// Asignar el valor adecuado al campo de monto
	if (tipoSeleccionado === "Gasto") {
		montoInput.value = "-0";
	} else if (tipoSeleccionado === "Ganancia") {
		montoInput.value = "0";
	}
});

//FILTRO CATEGORIA
