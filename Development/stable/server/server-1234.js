var http = require('http');
var mysql = require('mysql');
var helperlib = require('./helper.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gressl123",
  database: "Supermarkt_Verwaltung_New"
});


con.connect(function (error) {

    http.createServer(function (req, res) {

	     console.log(req.headers.authorization);
		 
        if (req.url != "/favicon.ico" && req.url != "") {
            try {
				//GET
				if (req.method == "GET"){
					
                console.log("req.url: " + req.url);

                var requesttype = helperlib.getRequestType(req.url);
                var parameters = helperlib.getAllParameters(req.url);

                console.log("request_type:  " + requesttype);
                console.log("single params: " + parameters);

 
                if (parameters != undefined) {

                    console.log("lenght: " + parameters.length);

                    var query = helperlib.BuildQuery(requesttype, parameters);

                    console.log("Querystring: " + query);
                    con.query(query, function (err, result, fields) {
                        if (err || error) {
                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                            res.write(" " + err);
                            res.end();
                        }
                        else {

                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.write(helperlib.getResponseString(requesttype, result));
                            res.end();
                        }
                    });
                }
                else {
                    res.write("invalid parameters");
                    res.end();
                }
					
				}
				
				//POST
				else if(req.method == "POST"){
					if(req.url != "" && req.url.toLowerCase() == "/login")
					{
						var buffer = new Buffer(req.headers.authorization.split(" ")[1], 'base64')
                        var credentials = buffer.toString();
						
						helperlib.Login(res, con, credentials);   
					}
					else{
						//error
					}
				}
				
				//PATCH
				else if(req.method == "PATCH"){
					
					
				}
				

            }
            catch (ex) {
                console.log(ex);
            }
        }
        else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write("no parameter, check your request!");
            res.end();
        }


    }).listen(1234);
});


