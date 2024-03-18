const arrayCategorias = JSON.parse(localStorage.getItem("categorias")) || [
	{
		id: uuidv4(),
		nombre: "Servicio",
	},
	{
		id: uuidv4(),
		nombre: "Educacion",
	},
	{
		id: uuidv4(),
		nombre: "Deporte",
	},
	{
		id: uuidv4(),
		nombre: "Gustos",
	},
];
console.log("arrayCategorias");
