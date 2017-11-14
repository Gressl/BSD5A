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

app.get('/', function (req, res) {
    fireResponse(res,200, "Server is running!")
});

app.get('/get', function (req, res) {
    fireResponse(res, 200, "/get " + req.query.table);
});

app.get('/login', function (req, res) {
    
    var auth_token = req.headers.authorization.split(" ")[1];
    console.log(auth_token);

    var buffer = new Buffer(auth_token, 'base64')
    var credentials = buffer.toString().split(":");

    console.log(credentials);
    
    var success = checkCredentials(credentials);
    fireResponse(res, success.httpcode, "" + success.result);
    
});

function checkCredentials(credentials) {
    try {
         var query = "select count(*) from Mandatar where M_ID = \'" + credentials[0] + "\' AND Passwort = \'" + credentials[1] + "\'";
         con.query(query, function (err, result, fields) {

            if (err) {
                return {"httpcode": 500, "result" : false};
            }
            else {

                if (result[0]["count(*)"] == "1") {
                    return { "httpcode": 200, "result": true };
                }
                else {
                    return { "httpcode": 401, "result": false };
                }

            }
         });
    } catch (e) {
        return { "httpcode": 500, "result": false };
    }
}

function fireResponse(res,httpcode, message) {
    res.writeHead(httpcode, contenttype);
    res.write(message);
    res.end();
}

app.listen(1234);
