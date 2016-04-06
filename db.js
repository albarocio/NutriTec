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

function getScopeIdFromInsert(insertQuery) {
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
function registerPersona(persona, cb) {
	var query ='insert into persona_detalle(altura,peso,edad,IMC) values(0,0,0,0);'
	query+='insert into persona(nombre,correo,clave,id_persona_detalle) '
		+"values('"+persona.name+"','"+persona.mail+"','"+persona.password+"',SCOPE_IDENTITY());";
	query+="select top 1 * from persona where correo='"+persona.mail
		+"' and clave='"+persona.password+"' and id_persona=SCOPE_IDENTITY();";		

	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); // or: var request = connection.request();
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}
function loginPersona(credencial, cb) {
	var query ="select top 1 * from persona where correo='"+credencial.mail
	+"' and clave='"+credencial.password+"'" 
				
	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); // or: var request = connection.request();
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}
function getPersona_detalle(id_persona_detalle,cb){
	var query ="select top 1 * from persona_detalle where id_persona_detalle='"+id_persona_detalle+"'" 
	console.log(query)
	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); // or: var request = connection.request();
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}
function updatePersona_detalle(persona_detalle,cb) {
	var query ="update persona_detalle"
		+" set peso='"+persona_detalle.peso+"',"
		+"altura='"+persona_detalle.altura+"',"
		+"edad='"+persona_detalle.edad+"',"
		+"IMC='"+persona_detalle.imc+"'"
		+" where id_persona_detalle='"+persona_detalle.id_persona_detalle
		+"';select * from persona_detalle where id_persona_detalle='"+persona_detalle.id_persona_detalle+"';" 
		
		console.log(query)
	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); // or: var request = connection.request();
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}
function getArticulo(id_recomendacion,cb) {
	var query ="select * from recomendacion where id_recomendacion='"+id_recomendacion+"'"; 
	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); // or: var request = connection.request();
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}

module.exports =
{
	createPersonaDetalle,
	registerPersona,
	loginPersona,
	getPersona_detalle,
	updatePersona_detalle,
	getArticulo
}