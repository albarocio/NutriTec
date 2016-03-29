var sql=require('mssql')


var CONFIG = {
    user: 'softcake@vhxevvkl91',
    password: 'nutritec@m1',
    server: 'vhxevvkl91.database.windows.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'nutritec',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}
function getPersonas() {
	sql.connect(CONFIG).then(function() {
		new sql.Request()
		.query('select * from persona')
		.then(function(recordset) {
			console.dir(recordset);
		}).catch(function(err) {
			console.log(err) 
		});

	}).catch(function(err) {
		console.log(err);
	});
}

module.exports ={getPersonas}