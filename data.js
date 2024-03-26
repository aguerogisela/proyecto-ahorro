const arrayCategorias = JSON.parse(localStorage.getItem("categorias")) || [
	{
		id: uuidv4(),
		nombre: "Comida",
		gasto: 0,
		ganancia: 0,
	},
	{
		id: uuidv4(),
		nombre: "Servicios",
		gasto: 0,
		ganancia: 0,
	},
	{
		id: uuidv4(),
		nombre: "Comida",
		gasto: 0,
		ganancia: 0,
	},
	{
		id: uuidv4(),
		nombre: "Educación",
		gasto: 0,
		ganancia: 0,
	},
	{
		id: uuidv4(),
		nombre: "Transporte",
		gasto: 0,
		ganancia: 0,
	},
	{
		id: uuidv4(),
		nombre: "Trabajo",
		gasto: 0,
		ganancia: 0,
	},
];
console.log("arrayCategorias");
