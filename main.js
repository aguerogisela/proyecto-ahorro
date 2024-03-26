//**********  SECCION OPERACIONES **************

// Variables globales
let operacionEditandoId = null;
let arrayOperaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

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

			// Mostrar el contenedor de la nueva operación

			contenedorOpNueva.classList.remove("hidden");
		});
		// Código para eliminar una operación

		const eliminarEnlaceOp = document.getElementById(`eliminarOp-${idOp}`);
		eliminarEnlaceOp.addEventListener("click", () => {
			// Eliminar la operación
			const index = arrayOperaciones.findIndex((op) => op.idOp === idOp);
			arrayOperaciones.splice(index, 1);

			// Volver a cargar la tabla
			generarTabla(arrayOperaciones);

			// Guardar el array actualizado en el almacenamiento local
			localStorage.setItem("operaciones", JSON.stringify(arrayOperaciones));
		});
	});
};
//*********** ELIMINAR  DEL ARRAY ***********/

// Actualiza la lógica al eliminar una operación
const eliminarOperacion = (idOp) => {
	// Encuentra la operación y obtén su categoría y monto
	const operacion = arrayOperaciones.find((op) => op.idOp === idOp);
	const categoria = operacion.categoria;
	const monto = parseFloat(operacion.monto);

	// Encuentra la categoría correspondiente y ajusta su gasto o ganancia
	const categoriaIndex = arrayCategorias.findIndex(
		(cat) => cat.nombre === categoria
	);
	if (monto < 0) {
		arrayCategorias[categoriaIndex].gasto -= Math.abs(monto);
	} else {
		arrayCategorias[categoriaIndex].ganancia -= monto;
	}

	// Resto del código para eliminar la operación...
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

		tablaBody.innerHTML += `
            <tr class="border-b border-gray-300">
                <td class="py-2 px-4">${descripcion}</td>
                <td class="py-2 px-4">${categoria}</td>
                <td class="py-2 px-4">${fecha}</td>
                <td class="py-2 px-4 ${colorClase}">${monto}</td>

                <td class="py-2 px-4">
                    <a href="javascript:void(0)" class="boton-editar-operacion" dataOp-id="${idOp}">
                    <i class="far fa-edit boton-editar text-blue-500 cursor-pointer"></i></a>
                    <a href="javascript:void(0)" id="eliminarOp-${idOp}"><i class="far fa-trash-alt boton-eliminar text-red-500 cursor-pointer"></i></a>
                </td>
            </tr>`;

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
	// Crear un objeto para almacenar los totales por categoría
	const totalesPorCategoria = {};

	// Calcular los totales por categoría
	arrayOperaciones.forEach((operacion) => {
		const { categoria, monto } = operacion;
		// Verificar si la categoría ya existe en el objeto, si no, inicializar los totales en 0
		if (!totalesPorCategoria[categoria]) {
			totalesPorCategoria[categoria] = { ganancia: 0, gasto: 0 };
		}
		// Sumar el monto de la operación al total correspondiente (ganancia o gasto) de la categoría
		if (parseFloat(monto) > 0) {
			totalesPorCategoria[categoria].ganancia += parseFloat(monto);
		} else {
			totalesPorCategoria[categoria].gasto += parseFloat(monto);
		}
	});

	// Crear el HTML para mostrar los reportes por categoría
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

// Código para agregar una nueva operación

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
			// Eliminar la categoría
			const index = arrayCategorias.findIndex((cat) => cat.id === id);
			arrayCategorias.splice(index, 1);

			// Volver a cargar la tabla
			cargarTabla(arrayCategorias);

			// Opcional: Guardar el array actualizado en el almacenamiento local
			localStorage.setItem("categorias", JSON.stringify(arrayCategorias));
		});
	});
};

// Código para cargar la tabla de categorías
const tablaCategoria = document.getElementById("table-categoria");

const cargarTabla = (data) => {
	tablaCategoria.innerHTML = "";
	data.forEach((categoria) => {
		const { id, nombre } = categoria;
		tablaCategoria.innerHTML += `<tr class="border-b border-gray-300">
            <td class="py-2 px-4">${id}</td>
            <td class="py-2 px-4">${nombre}</td>
            <td class="py-2 px-4">
                <a href="javascript:void(0)" class="boton-editar-categoria" data-id="${id}">
                    <i class="far fa-edit text-blue-500 cursor-pointer"></i>
                </a>
                <a href="javascript:void(0)" id="eliminar-${id}">
                    <i class="far fa-trash-alt text-red-500 cursor-pointer"></i>
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
		// Si hay un ID de categoría guardado, estamos editando una categoría existente
		const index = arrayCategorias.findIndex(
			(cat) => cat.id === categoriaEditandoId
		);
		arrayCategorias[index].nombre = nombreCategoria; // Actualizar el nombre de la categoría
		categoriaEditandoId = null; // Reiniciar el ID de la categoría que se está editando
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

	const filasTabla = document.querySelectorAll("#table-body tr");

	filasTabla.forEach((fila) => {
		const montoElement = fila.querySelector("td:nth-child(4)"); // Utilizar td:nth-child(4) para el cuarto td
		if (montoElement) {
			const monto = parseFloat(montoElement.textContent.replace("$", ""));

			if (valorSeleccionado === "mayor_monto" && monto < 0) {
				fila.style.display = "none";
			} else if (valorSeleccionado === "menor_monto" && monto >= 0) {
				fila.style.display = "none";
			} else {
				fila.style.display = "";
			}
		} else {
			console.error(
				"El elemento td:nth-child(4) no está presente en una fila."
			);
		}
	});
}

const filtroTipoSelect = document.getElementById("filtro-tipo");

// Agregar evento de cambio al select
filtroTipoSelect.addEventListener("change", function () {
	// Obtener el valor seleccionado
	const tipoSeleccionado = filtroTipoSelect.value;

	// Obtener referencia al campo de monto
	const montoInput = document.getElementById("amount");

	// Asignar el valor adecuado al campo de monto
	if (tipoSeleccionado === "Gasto") {
		// Si se selecciona "Gasto", asignar un valor menor a 0
		montoInput.value = "-0";
	} else if (tipoSeleccionado === "Ganancia") {
		// Si se selecciona "Ganancia", asignar un valor mayor a 0
		montoInput.value = "0";
	}
});

//FILTRO CATEGORIA
const filtroCategoria = document.getElementById("filtro-cate");

filtroCategoria.addEventListener("change", () => {
	const categoriaSeleccionada = filtroCategoria.value;
	const filasTabla = tablaBody.querySelectorAll("tr");

	filasTabla.forEach((fila) => {
		const nombreCategoria = fila.querySelector("td:nth-child(2)").textContent;

		if (
			categoriaSeleccionada === "Todas" ||
			categoriaSeleccionada === nombreCategoria
		) {
			fila.style.display = "";
		} else {
			fila.style.display = "none";
		}
	});
	console.log(filtroCategoria);
});
