var http = require('http');
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gressl123",
  database: "Supermarkt_Verwaltung"
});


con.connect(function(error) {
	
    http.createServer(function (req, res) {
        try{
            var tablename = getTableName(req.url);
			
			
            if (getTableName(req.url) != undefined) {
                
                con.query("SELECT * FROM " + capitalizeFirstLetter(tablename), function (err, result, fields) {
                    if (err || error) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
					res.write(err + "\n\n\n" + error);
                        res.end();
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });

                        for (var key in result[0]) {
                            res.write(key + "                        ");
                        }
                        res.write("\n");

                        for (var key in result[0]) {
                            res.write("----------------------------------");
                        }

                        res.write("\n");

                        for (var key in result) {
                            res.write("\n");
                            for (var valkey in result[key]) {

                                res.write(result[key][valkey] + "                      ");

                            }
                            res.write("\n");
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
    catch(ex){
       
    }
	
	}).listen(1234); 
});


function getTableName(requesturl) {
	try {
 var all = requesturl.split("?");
	if(all != undefined){
		
	//console.log("all[1]:" + all[1]);
	var split_1 = all[1].split("=");
	//console.log("split_1:" + split_1);
	
	if(split_1[0].toLowerCase() == "table" && split_1[1] !== undefined){
		return split_1[1];
	}
	else{s
		return undefined;
	}
	}
	else{
		return undefined;
	}
	
} catch (err) {
	return undefined;
} 
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}