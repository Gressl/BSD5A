var http = require('http');
var mysql = require('mysql');
var helperlib = require('./db_functions.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gressl123",
  database: "Supermarkt_Verwaltung_New"
});


con.connect(function (error) {

    http.createServer(function (req, res) {
        try {
            var split = helperlib.getSingleParameters(req.url);
            var parameters = helperlib.getAllParameters(split);
            console.log("Everything splitted: " + parameters);
            if (parameters != undefined) {

                console.log("lenght: " + parameters.length);


                var query = helperlib.BuildQuery(parameters);

                console.log("Querystring: " + query);
                con.query(query, function (err, result, fields) {
                    if (err || error) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.write(" "+ err);
                        res.end();
                    }
                    else {
                        
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.write(helperlib.getResponseString(split[0], result));
                        res.end();
                    }
                });
            }
                //res.write(JSON.stringify(result));
            else {
                res.write("invalid parameters");
                res.end();
            }

        }
        catch (ex) {
            console.log(ex);
        }

    }).listen(1234);
});


