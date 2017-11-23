var http = require('http');
var mysql = require('mysql');
var helperlib = require('./helper.js');
var express = require('express');

var creds = {};

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
			creds = credentials;
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


app.get('/get', function (req, res) {
	try{
		
	if(!req.query.table){
		fireResponse(res, 400, "/get " + req.query.table);
	} 
	else{
		
		switch (req.query.table.toLowerCase()) {
			
            case "kunde":
				 var query = "select kund.K_ID, kund.Name, kund.Adresse, kund.UID from Mandatar m  join Verkauf k on k.MandatarID = m.M_ID join Kunde kund on kund.K_ID = k.KundenID  where M_ID = \'"+ creds[0] +"\' AND Passwort = \'" + creds[1] + "\'";
				 console.log(query);
	             con.query(query, function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error");
                        }
                        else {
							var ret = createResponseGET(result);
							fireResponse(res,200, ret);
                        }
                    });	
                break;
			
			case "verkauf":
				var query = "select k.S_ID, DATE_FORMAT(k.Verkaufsdatum,'%d/%m/%Y') as Datum, k.KundenID, kund.Name as KundenName, l.I_ID, l.ItemMenge, l.AktuellerPreis, l.ItemMenge*l.AktuellerPreis AS KumulierterPreis from Mandatar m  join Verkauf k on k.MandatarID = m.M_ID join Kunde kund on kund.K_ID = k.KundenID join Lagerentnahme l on k.S_ID = l.S_ID  where M_ID = \'"+ creds[0] +"\' AND Passwort = \'" + creds[1] + "\'";
			
				 console.log(query);
	             con.query(query, function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error");
                        }
                        else {
							var ret = createResponseGET(result);
							fireResponse(res,200, ret);
                        }
                    });	
			break;
         
            default:
					fireResponse(res, 400, "error");
                break;

        }	
	}
	} catch (e) {
        fireResponse(res, 500, "something went wrong");
    }
});

app.get('/', function (req, res) {
    fireResponse(res,200, "Server is running!")
});


function createResponseGET(sqlresult){
	            var cols = 0;
                var currentcol = 1;
				var retstring = "";
				
                for (var valkey in sqlresult[0]) {
                    cols++;
                }

                for (var key in sqlresult[0]) {
                    if (currentcol != cols) {
                        retstring += (key + ";");
                    }
                    else {
                        retstring += (key + "");
                    }
                    currentcol++;
                }


                for (var key in sqlresult) {
                    retstring += ("\n");
                    currentcol = 1;
                    for (var valkey in sqlresult[key]) {

                        if (currentcol != cols) {
                            retstring += (sqlresult[key][valkey] + ";");
                        }
                        else {
                            retstring += (sqlresult[key][valkey] + "");
                        }
                        currentcol++;
                    }

                }
				
				return retstring;
				
}

function fireResponse(res,httpcode, message) {
    res.status(httpcode);
    res.send(message);
}

app.listen(1234);
