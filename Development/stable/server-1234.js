var http = require('http');
var mysql = require('mysql');
var helperlib = require('./db_functions.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gressl123",
  database: "Supermarkt_Verwaltung"
});


con.connect(function (error) {

    http.createServer(function (req, res) {
        try {
            var split = helperlib.getSingleParameters(req.url);
            var parameters = helperlib.getAllParameters(split);
            console.log("Everything splitted: " + parameters);
            if (parameters != undefined) {

                var query = helperlib.BuildQuery(parameters);

                console.log("Querystring: " + query);
                con.query(query, function (err, result, fields) {
                    if (err || error) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.write(err + "\n\n\n" + error);
                        res.end();
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });

                        var cols = 0;
                        var currentcol = 1;
                        for (var valkey in result[0]) {
                            cols++;
                        }

                        for (var key in result[0]) {
                            if (currentcol != cols) {
                                res.write(key + ";");
                            }
                            else {
                                res.write(key + "");
                            }
                            currentcol++;
                        }


                        for (var key in result) {
                            res.write("\n");
                            currentcol = 1;
                            for (var valkey in result[key]) {
                                
                                if (currentcol != cols) {
                                    res.write(result[key][valkey] + ";");
                                }
                                else {
                                    res.write(result[key][valkey] + "");
                                }


                              
                                currentcol++;
                            }
                            
                        }


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


