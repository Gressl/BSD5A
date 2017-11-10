var http = require('http');
var mysql = require('mysql');
var helperlib = require('./helper.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gressl123",
  database: "Supermarkt_Verwaltung_New"
});

helperlib.initResponse(res);

con.connect(function (error) {

    http.createServer(function (req, res) {
          helperlib.initResponse(res);
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
					    console.log(req.headers.authorization);
						var buffer = new Buffer(req.headers.authorization.split(" ")[1], 'base64')
                        var credentials = buffer.toString();
						
                        helperlib.responseToLogin(con, credentials);
					}
					else{
					    res.writeHead(400, { 'Content-Type': 'text/plain' });
					    res.write("false");
					    res.end();
					}
				}
				
				//PATCH
				else if(req.method == "PATCH"){
					
					
				}
				

            }
            catch (ex) {
                console.log(ex);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write("Oh God! An Exception was caught: " + ex);
                res.end();

            }
        }
        else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write("no parameter, check your request!");
            res.end();
        }


    }).listen(1234);
});


