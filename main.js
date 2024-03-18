const tablaCategoria = document.getElementById("table-categoria");

const cargarTabla = (data) => {
	tablaCategoria.innerHTML = "";
	data.forEach((categoria) => {
		const { id, nombre } = categoria;
		tablaCategoria.innerHTML += `<tr class="border-b border-gray-300">
            <td class="py-2 px-4">${id}</td>
            <td class="py-2 px-4">${nombre}</td>
            <td class="py-2 px-4"> 
                <a href="javascript:void(0)" id="editar-${id}">
                    <i class="far fa-edit boton-editar-categoria text-blue-500 cursor-pointer"></i>
                </a>
                <a href="javascript:void(0)" id="eliminar-${id}">
                    <i class="far fa-trash-alt boton-eliminar text-red-500 cursor-pointer"></i>
                </a>
            </td>
        </tr>`;
	});
	// eventosEditarCategoria(document.querySelectorAll(".boton-editar-categoria"));
};

const agregarCategoria = () => {
	const nombreCategoria = document.getElementById(
		"editar-categoria-input"
	).value;

	const nuevaCategoria = {
		id: uuidv4(),
		nombre: nombreCategoria,
	};

	arrayCategorias.push(nuevaCategoria);

	cargarTabla(arrayCategorias);

	document.getElementById("editar-categoria-input").value = "";
	console.log(agregarCategoria);
};

document
	.getElementById("agregar-categoria-btn")
	.addEventListener("click", agregarCategoria);

cargarTabla(arrayCategorias);
