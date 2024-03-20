//SECCION  OPERACIONES
let operacionEditandoId = null;

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

			// Mostrar el contenedor de la nueva operación		ç
			contenedorOpNueva.classList.remove("hidden");
		});
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

let arrayOperaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
const tablaBody = document.getElementById("table-body");

// Función para generar la tabla con los datos existentes
const generarTabla = (arrayOperaciones) => {
	tablaBody.innerHTML = "";
	arrayOperaciones.forEach((operacion) => {
		const { descripcion, categoria, fecha, monto, idOp } = operacion;
		var colorClase = parseInt(monto) > 0 ? "text-green-500" : "text-red-500";

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
	});
	eventosEditarOperaciones(
		document.querySelectorAll(".boton-editar-operacion")
	);
};

// Función para agregar una nueva operación
const agregarOperacion = () => {
	const descripcion = document.getElementById("description").value;
	const categoria = document.getElementById("category").value;
	const fecha = document.getElementById("date").value;
	const monto = document.getElementById("amount").value;
	const idOp = uuidv4(); // Generar un ID único para la nueva operación

	if (operacionEditandoId) {
		const index = arrayOperaciones.findIndex(
			(op) => op.idOp === operacionEditandoId
		);
		arrayOperaciones[index] = {
			idOp: operacionEditandoId,
			descripcion: descripcion,
			categoria: categoria,
			fecha: fecha,
			monto: monto,
		};
		operacionEditandoId = null;
	} else {
		const nuevaOperacion = {
			idOp: idOp,
			descripcion: descripcion,
			categoria: categoria,
			fecha: fecha,
			monto: monto,
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
///SECCION CATEGORIA

const tablaCategoria = document.getElementById("table-categoria");

let categoriaEditandoId = null;

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
// Agregar Categoría: La función agregarCategoria toma el valor del campo de entrada y crea un nuevo objeto de categoría con un ID generado aleatoriamente. Luego, agrega esta nueva categoría al arrayCategorias, vuelve a cargar la tabla y guarda el arrayCategorias en el almacenamiento local.

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

document
	.getElementById("agregar-categoria-btn")
	.addEventListener("click", agregarCategoria);

// Mostrar el contenedor de categorías antes de cargar la tabla
document.getElementById("contenedor-categorias").classList.remove("hidden");

// Luego, cargar la tabla como lo haces actualmente
cargarTabla(arrayCategorias);

////
////
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

/////////////////
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
