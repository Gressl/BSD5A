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
			res.write("\n\n\n\n\n");
			
			console.log(result[1]);
			for (var key in result) {
			res.write(result[key].K_ID + "----");
			}				
			
			res.write("\n");
			
			for(var i = 0; i < result.length; i++){
				res.write(JSON.stringify(result[i]));
			}
			
			res.end();
		});
	}).listen(1234); 
});