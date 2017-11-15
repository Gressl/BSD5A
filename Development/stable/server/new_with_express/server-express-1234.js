var http = require('http');
var mysql = require('mysql');
var helperlib = require('./helper.js');
var express = require('express');

var app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gressl123",
  database: "Supermarkt_Verwaltung_New"
});

//helperlib.initResponse(res);
con.connect();

app.get('/login', function (req, res) {
     try {
		 
		  var auth_token = req.headers.authorization.split(" ")[1];
			console.log(auth_token);

			var buffer = new Buffer(auth_token, 'base64')
			var credentials = buffer.toString().split(":");

         var query = "select count(*) from Mandatar where M_ID = \'" + credentials[0] + "\' AND Passwort = \'" + credentials[1] + "\'";
         con.query(query, function (err, result, fields) {

            if (err) {
                fireResponse(res, 500, "false");
            }
            else {

                if (result[0]["count(*)"] == "1") {
					fireResponse(res, 200, "true");
                }
                else {
                    fireResponse(res, 401, "false");
                }

            }
         });
    } catch (e) {
        fireResponse(res, 500, "false");
    }
});

app.use(function(req,res, next){
	
	 try {
		 
		  var auth_token = req.headers.authorization.split(" ")[1];
			console.log(auth_token);

			var buffer = new Buffer(auth_token, 'base64')
			var credentials = buffer.toString().split(":");

         var query = "select count(*) from Mandatar where M_ID = \'" + credentials[0] + "\' AND Passwort = \'" + credentials[1] + "\'";
         con.query(query, function (err, result, fields) {

            if (err) {
                fireResponse(res, 500, "something went wrong.");
            }
            else {

                if (result[0]["count(*)"] == "1") {
                    next();
                }
                else {
                    fireResponse(res, 401, "unauthorized");
                }

            }
         });
    } catch (e) {
        fireResponse(res, 400, "credentials are needed!");
    }
	
});

app.get('/', function (req, res) {
    fireResponse(res,200, "Server is running!")
});

app.get('/get', function (req, res) {
    fireResponse(res, 200, "/get " + req.query.table);
});

function checkCredentials(credentials) {
   
}

function fireResponse(res,httpcode, message) {
    res.writeHead(httpcode, contenttype);
    res.write(message);
    res.end();
}

app.listen(1234);
