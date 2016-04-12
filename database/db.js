var mssql=require('mssql')
var CONFIG =require('./config')

function createPersonaDetalle(persona_detalle,cb) {
	var query ='insert into persona_detalle(altura,peso,edad,IMC)'
		+' values('+persona_detalle.altura+','+persona_detalle.peso+','
		+persona_detalle.edad+','+persona_detalle.IMC+');';

	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); 
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
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
	    var request = new mssql.Request(connection); 
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
	    var request = new mssql.Request(connection); 
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}
function getPersona_detalle(id_persona_detalle,cb){
	var query ="select top 1 * from persona_detalle where id_persona_detalle='"+id_persona_detalle+"'" 
	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); 
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
		+"IMC='"+persona_detalle.IMC+"'"
		+" where id_persona_detalle='"+persona_detalle.id_persona_detalle
		+"';select * from persona_detalle where id_persona_detalle='"+persona_detalle.id_persona_detalle+"';" 
		
	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); 
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
	    var request = new mssql.Request(connection); 
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}

function getRecomendaciones(detalle, cb) {
	// body...
	var query=
	`select top 5 
		rec.id_recomendacion
		, titulo
		, descripcion
		, descripcion_corta
		, imagen
	from (
		select distinct recenf.id_recomendacion
		from clasificacion_imc imc
		inner join enfermedad enf
		on enf.id_clasificacion_imc=imc.id_clasificacion_imc
		inner join recomendaciones_enfermedad recenf
		on recenf.id_enfermedad=enf.id_enfermedad
		where imc.imc_rango_menor<`+detalle.IMC+` 
		and imc.imc_rango_mayor>`+detalle.IMC+`
		and enf.edad_rango_menor<`+detalle.edad+`
	    and enf.edad_rango_mayor>`+detalle.edad+`) a
	inner join recomendacion rec
	on rec.id_recomendacion=a.id_recomendacion
	order by NEWID()`
	console.log(query)

	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); 
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}

function getEstadistica(detalle, cb) {
	// body...
	var query=
	`select
		id_Clasificacion_imc
		,descripcion
		,(select count(*) from persona_detalle pd where pd.IMC>cimc.imc_rango_menor and pd.IMC<cimc.imc_rango_mayor ) as total
	from clasificacion_imc cimc`
	var connection = new mssql.Connection(CONFIG, function(err) {
		if (typeof err !== "undefined" && err !== null) {
	    	cb( err );
	        return
	    }
	    var request = new mssql.Request(connection); 
		request.query(query, function(err, recordset) {
    		cb( err, recordset );
    	});
	});
}

module.exports =
{
	createPersonaDetalle, registerPersona, loginPersona, getPersona_detalle,
	updatePersona_detalle,getArticulo, getRecomendaciones, getEstadistica
}