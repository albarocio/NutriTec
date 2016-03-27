var sql=require('mssql')


var config = {
    user: 'softcake@vhxevvkl91',
    password: 'corinto0160@m1',
    server: 'vhxevvkl91.database.windows.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'nutritec',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}
/*
Server=tcp:vhxevvkl91.database.windows.net,1433;
Database=nutritec;
User ID=softcake@vhxevvkl91;
Password={aquí_va_la_contraseña};
Trusted_Connection=False;Encrypt=True;Connection Timeout=30;
 */

function getPersonas() {
	sql.connect(config).then(function() {

		// Query 
		new sql.Request().query('select * from persona').then(function(recordset) {
			console.dir(recordset);
		}).catch(function(err) {
			console.log(err) 
		});

	}).catch(function(err) {
		console.log(err);
	});
}

module.exports ={getPersonas}