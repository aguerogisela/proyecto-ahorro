const arrayCategorias = JSON.parse(localStorage.getItem("categorias")) || [
	{
		id: uuidv4(),
		nombre: "Comida",
	},
	{
		id: uuidv4(),
		nombre: "Servicios",
	},
	{
		id: uuidv4(),
		nombre: "Comida",
	},
	{
		id: uuidv4(),
		nombre: "Educación",
	},
	{
		id: uuidv4(),
		nombre: "Transporte",
	},
	{
		id: uuidv4(),
		nombre: "Trabajo",
	},
];
console.log("arrayCategorias");
