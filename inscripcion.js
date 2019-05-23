//Información de las materias
let materias= [{
	id: 1,
	nombre: 'matematicas',
	precio: 100000,
	duracion: 6,
},
{
	id: 2,
	nombre: 'ingles',
	precio: 50000,
	duracion: 3,
},
{
	id: 3,
	nombre: 'Programacion',
	precio: 0,
	duracion: 6,
}];
//Información de las opciones
const options = {	
	id: {
		alias: 'i',
		default: '0',
		demand: true,
	},
	nombre: {
		alias: 'n',
		default: '',
		demand: true,
	},
	cedula: {
		alias: 'c',
		default: '0',
		demand: true,
	},
}

const argv = require('yargs')
	.command('inscribirse','porQueTextoAqui', options)
	.argv;

const fs = require('fs');


let ofertas = (id, callback)=>{
	setTimeout(function(){
		let resultado='La materia: ' + materias[id].nombre + ' con el ID: ' + materias[id].id + ' tiene un precio de: '+ materias[id].precio + ' y una duracion de: ' + materias[id].duracion + ' meses \n';
		callback (resultado);
		}, (id+1)*2000);
}


let matricula=(id, nombre, cedula)=>{
	let inscrito = 'El estudiante ' + nombre + ' con cedula ' + cedula + ' se inscribio correctamente a ' + materias[id].nombre;
	fs.writeFile('usuario.txt', inscrito, (e) => {
        if (e) throw (e)
			console.log('Se ha creado el archivo')})
}

let materiasId = materias.find(function(materias){return materias.id == argv.id;});


if (!argv || (materiasId == undefined)) {
	if (argv.id){console.log('EL id: ' + argv.id + ' No pertenece a las materias vigentes \n');}
	ofertas(0, function(resultado){console.log(resultado)});
	ofertas(1, function(resultado){console.log(resultado)});
	ofertas(2, function(resultado){console.log(resultado)});
}
else if(argv.id && argv.nombre && argv.cedula){
	matricula(argv.id, argv.nombre, argv.cedula);
}
else {
	console.log('\n Para matricularse, usted debe escribir: --id="El id de la materia" --nombre="Su nombre" --cedula="Su cedula"');
}
