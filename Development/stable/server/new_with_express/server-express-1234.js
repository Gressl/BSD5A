var http = require('http');
var mysql = require('mysql');
var helperlib = require('./helper.js');
var express = require('express');
var bodyParser = require('body-parser');
var creds = {};

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gressl123",
  database: "Supermarkt_Verwaltung_New"
});



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


//READ----------------------------------
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
							var ret = createJSONGetTableResponse(result);
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
							var ret = createJSONGetTableResponse(result);
							fireResponse(res,200, ret);
                        }
                    });	
			break;
			
			case "rechnung":
			  var query = "Select r.S_ID, r.Rechnungsnummer, r.schonbezahlt from Mandatar m join Verkauf k on m.M_ID = k.MandatarID join Rechnung r on k.S_ID = r.S_ID where m.M_ID = \'"+ creds[0] +"\' AND m.Passwort = \'" + creds[1] + "\'";
				
				console.log(query);
	             con.query(query, function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error");
                        }
                        else {
							var ret = createJSONGetTableResponse(result);
							fireResponse(res,200, ret);
                        }
                    });	
			
			break;
			
			case "lagerentnahme":
			var query = "select  l.I_ID, l.S_ID, l.ItemMenge , l.AktuellerPreis from Mandatar m join Verkauf v on m.M_ID = v.MandatarID join Lagerentnahme l on l.S_ID = v.S_ID where m.M_ID = \'"+ creds[0] +"\' AND m.Passwort = \'" + creds[1] + "\'";
			
			console.log(query);
	             con.query(query, function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error");
                        }
                        else { 
							var ret = createJSONGetTableResponse(result);
							fireResponse(res,200, ret);
                        }
                    });	
			
			
			break;
			
			case "lageritem":
			
			  var query = "select li.I_ID, li.Name, li.Preis As Preis_per_Stk, li.Menge from Mandatar m join Verkauf v on m.M_ID = v.MandatarID join Lagerentnahme l on l.S_ID = v.S_ID join Lageritem li on li.I_ID = l.I_ID where m.M_ID = \'"+ creds[0] +"\' AND m.Passwort = \'" + creds[1] + "\'";
			 
			 console.log(query);
	             con.query(query, function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error");
                        }
                        else { 
							var ret = createJSONGetTableResponse(result);
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
        fireResponse(res, 500, "oops, something went wrong");
    }
});

//CREATE
app.put('/add', function (req, res) {
try{
	console.log(req.body);
	
	
	if(!req.body.table){
		fireResponse(res, 400, "no table specified!");
	} 
	else{
		
		
		switch (req.body.table.toLowerCase()) {
			case "kunde":
			 
			 try{
			 
			 if(req.body.Name && req.body.Adresse && req.body.UID){
				  con.query("select MAX(K_ID) AS LastID from Kunde", function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error (DB)");
                        }
                        else { 
							var newid = parseInt(result[0].LastID);
							newid++;
							console.log(newid);
							
							
								con.query("insert into Kunde(K_ID, Name, Adresse, UID) values(\'"  + newid + "\', \'" + req.body.Name + "\', \'" + req.body.Adresse + "\', \'" + req.body.UID + "\')", function (err1, result1, fields) {
				
								if (err1) {
									fireResponse(res, 500, "error (DB)");
								}
								else { 
									
									fireResponse(res,200, result1);
								}
								});		
                        }
                    });		
			 } 
			 else{
				  fireResponse(res, 400, "some params are missing!");
			 }
			 
			 }
			 catch(e){
				  fireResponse(res, 500, "something wengt wrong!");
			 }
			 
			break;
			
			case "lagerentnahme":
			//I_ID, S_ID, ItemMenge, AktuellerPreis
			try{
				
				if(req.body.I_ID && req.body.S_ID && req.body.ItemMenge && req.body.AktuellerPreis){
					 var query = "insert into Lagerentnahme(I_ID, S_ID, ItemMenge, AktuellerPreis) values(\'"  + req.body.I_ID + "\', \'" + req.body.S_ID + "\', \'" + req.body.ItemMenge + "\', \'" + req.body.AktuellerPreis + "\')";
			 
			 console.log(query);
	             con.query(query, function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error");
                        }
                        else { 
							var ret = createJSONGetTableResponse(result);
							fireResponse(res,200, ret);
                        }
                    });	
				}
				else{
					fireResponse(res, 500, "params are missing or wrong");
				}
			}
			catch(e){
				fireResponse(res, 500, "something went wrong!");
			}
			
			break;
			
			case "lageritem":
			// I_ID, Name, Preis, Menge
			//select I_ID from Lageritem order by I_ID desc limit 1
			try{
				
				if(req.body.Name && req.body.Preis && req.body.Menge){
					
					con.query("select I_ID from Lageritem order by I_ID desc limit 1", function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error");
                        }
                        else { 
						
							var oldstring = result[0].I_ID;
							var oldid = oldstring.substring(2,4);
							var newid = parseInt(oldid);
							newid++;
							
							var newstring = "LI0" + newid;
							
							console.log(newid);
							
							console.log(result[0]);
							var query = "insert into Lageritem(I_ID, Name, Preis, Menge) values(\'"  + newstring + "\', \'" + req.body.Name + "\', \'" + req.body.Preis + "\', \'" + req.body.Menge + "\')";
							console.log(query);
							con.query(query, function (err1, result, fields) {
				
							if (err) {
								fireResponse(err1, 500, "error");
							}
							else { 
								var ret = createJSONGetTableResponse(result);
								fireResponse(res,200, ret);
							}
							});	
                        }
				});	
				}
				else{
					fireResponse(res, 500, "params are missing or wrong");
				}
			}
			catch(e){
				fireResponse(res, 500, "something went wrong!");
			}
			
			break;
			
			case "verkauf":
			//S_ID, Verkaufsdatum, KundenID, MandatarID
			try{
				 if(req.body.Verkaufsdatum && req.body.KundenID && req.body.MandatarID){
				  con.query("select S_ID from Verkauf order by S_ID desc limit 1", function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error (DB)");
                        }
                        else { 
								var oldstring = result[0].S_ID;
								var oldid = oldstring.substring(2,4);
								var newid = parseInt(oldid);
								newid++;
							
							   var newstring = "SA0" + newid;
							
							
								con.query("insert into Verkauf(S_ID, Verkaufsdatum, KundenID, MandatarID) values(\'"  + newstring + "\', \'" + req.body.Verkaufsdatum + "\', \'" + req.body.KundenID + "\', \'" + req.body.MandatarID + "\')", function (err1, result1, fields) {
				
								if (err1) {
									fireResponse(res, 500, "error (DB)");
								}
								else { 
									fireResponse(res,200, result1);
								}
								});		
                        }
                    });		
			 } 
			 else{
				  fireResponse(res, 400, "some params are missing!");
			 }
			}
			catch(e){
				fireResponse(res, 500, "something went wrong!");
			}
			
			break;
			
			case "rechnung":
			//Rechnungsnummer, schonbezahlt, S_ID
			try{
				 if(req.body.schonbezahlt && req.body.S_ID ){
				  con.query("select Rechnungsnummer from Rechnung order by Rechnungsnummer desc limit 1", function (err, result, fields) {
				
                        if (err) {
                            fireResponse(res, 500, "error (DB)");
                        }
                        else { 
								var oldstring = result[0].Rechnungsnummer;
								var oldid = oldstring.substring(2,4);
								var newid = parseInt(oldid);
								newid++;
							
							   var newstring = "AT0" + newid;
							
							
								con.query("insert into Rechnung(Rechnungsnummer, schonbezahlt, S_ID) values(\'"  + newstring + "\', \'" + req.body.schonbezahlt + "\', \'" + req.body.S_ID + "\')", function (err1, result1, fields) {
				
								if (err1) {
									fireResponse(res, 500, "error (DB)");
									console.log(err1);
								}
								else { 
									fireResponse(res,200, result1);
								}
								});		
                        }
                    });		
			 } 
			 else{
				  fireResponse(res, 400, "some params are missing!");
			 }
			}
			catch(e){
				fireResponse(res, 500, "something went wrong!");
			}
			
			break;
			
			
			default:
				fireResponse(res, 400, "error");
			break;
			
			
		}
	
	}	
} catch (e) {
    fireResponse(res, 500, "oops, something went wrong");
}
});


app.get('/', function (req, res) {
    fireResponse(res,200, "Server is running!")
});


function createJSONGetTableResponse(sqlresult){
				//console.log(sqlresult[0]);
				return sqlresult;
				
}

function fireResponse(res,httpcode, message) {
    res.status(httpcode);
    res.send(message);
}

app.listen(1234);
