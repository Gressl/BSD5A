var http = require('http');
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gressl123",
  database: "Supermarkt_Verwaltung"
});


con.connect(function(err) {
	if (err) throw err;
	http.createServer(function (req, res) {
  
		con.query("SELECT * FROM Kunde", function (err, result, fields) {
			if (err) throw err;
			res.writeHead(200, {'Content-Type': 'text/plain'});
			
			for (var key in result[0]) {
			res.write(key + "                        ");
			}
			res.write("\n");
			
			for (var key in result[0]) {
			res.write("-----------------------");
			}
			
			res.write("\n");
			
			for (var key in result) {
				res.write("\n");
				for (var valkey in result[key]) {
					
				  res.write(result[key][valkey] + "                      ");
				  
				}
					res.write("\n");
			
			}				
				//res.write(JSON.stringify(result));
			

			res.end();
		});
	}).listen(1234); 
});