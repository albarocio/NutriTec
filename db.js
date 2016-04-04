var mssql=require('mssql')

var CONFIG = {
    user: 'softcake@vhxevvkl91',
    password: 'nutritec@m1',
    server: 'vhxevvkl91.database.windows.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'nutritec',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}

/*Create, Read, Update and Delete*/

function createPersonaDetalle(persona_detalle) {
	// body...
	var query ='insert into persona_detalle(altura,peso,edad,IMC)'+
	' values('+persona_detalle.altura+','+persona_detalle.peso+','+persona_detalle.edad+','+persona_detalle.IMC+');';
	var scopeId=getScopeIdFromInsert(query)	
	return scopeId
}
function createPersona(persona){
	var query ='insert into persona_detalle(altura,peso,edad,IMC) values(0,0,0,0);'+
				'insert into persona(nombre,correo,clave,id_persona_detalle) '+ 
				"values('"+persona.nombre+"','"+persona.correo+"','"+persona.password+"',SCOPE_IDENTITY());";
	
	var scopeId=getScopeIdFromInsert(query)
	return scopeId;
}


function getScopeIdFromInsert(insertQuery) {
	// body...
	insertQuery+="SELECT SCOPE_IDENTITY() as scopeid;";
	// console.log(insertQuery)

	mssql.connect(CONFIG).then(function() {
		new mssql.Request()
		.query(insertQuery)
		.then(function(recordset) {
			// console.dir(recordset[0].scopeid);
			return recordset[0].scopeid;
		}).catch(function(err) {
			console.log(err) 
		});
	}).catch(function(err) {
		console.log(err);
	});
}
module.exports ={createPersonaDetalle,createPersona}