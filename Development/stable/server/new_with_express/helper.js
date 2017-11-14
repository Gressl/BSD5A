var SHA256 = require("crypto-js/sha256");

res = null;
contenttype = { 'Content-Type': 'text/plain' };

module.exports = (function () {

    function fireResponse(httpcode, message) {
        res.writeHead(httpcode, contenttype);
        res.write(message);
        res.end();
    }

    function getRequestType(requesturl) {
        try {
            var all = requesturl.split("?");
            if (all != undefined) {

                var split = all[0].slice(1, all[0].length);
                
                return split;
            }
            else {
                return undefined;
            }

        } catch (err) {
            return undefined;
        }
    }

    function getAllParameters(input) {
        var all = [];
        var splitafter = input.split("?");
        splitafter.splice(0, 1);


        var splitsec = splitafter[0].split("&");


        if (splitsec != undefined) {
            for (var i = 0; i < splitsec.length; i++) {
                var split = splitsec[i].split("=");
                for (var j = 0; j < split.length; j++) {
                    all.push(split[j]);
                }
            }

            return all;
        }
        else {
            return undefined;
        }
    }

    function BuildQuery(requesttype, parameters) {
        var querystring = "";
        if (parameters != undefined) {
            console.log("Parameter in db helper: " + parameters);

            switch (requesttype.toLowerCase()) {

                case "get":
                    if (parameters.length <= 2) {
                        querystring = "Select * from " + capitalizeFirstLetter(parameters[1].toLowerCase());
                    } else if(parameters.length == 4) {
                        querystring = "Select * from " + capitalizeFirstLetter(parameters[1].toLowerCase()) + " WHERE " +  parameters[2] + " = \'" + parameters[3] + "\'";
                    } 
                    break;
                    /* 
                case "update":
                   
                    if (parameters.length == 6) {
                        var tablename = parameters[1];
                        var col_to_set = parameters[2];
                        var value_to_set = parameters[3];
                        var col_to_bind = parameters[4];
                        var col_bind_value = parameters[5];

                        querystring = "UPDATE " + capitalizeFirstLetter(tablename.toLowerCase()) + " SET " + col_to_set + " = \'" + value_to_set + "\' Where " + col_to_bind + " = " + col_bind_value;
                       
                    }
                    else {
                        return "parameter length is wrong";
                    }
                    break;
                    */
                default:
                 
            }

            return querystring;
        }
        else {
            return undefined;
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    function getResponseString(cmd, sqlresult) {
        var retstring = "";

        switch (cmd.toLowerCase()) {

            case "get":

                var cols = 0;
                var currentcol = 1;
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

                break;

         
            default:
                return "Error";
                break;

        }
    }
   
    function responseToLogin(con, cred) {

        var credentials = cred.split(":");

	   var query = "select count(*) from Mandatar where M_ID = \'" + credentials[0] + "\' AND Passwort = \'" + credentials[1] + "\'";
	   
	    con.query(query, function (err, result, fields) {
				
                        if (err) {
                            fireResponse(500, "false");
                        }
                        else {
							
                            if (result[0]["count(*)"] == "1") {
                                fireResponse(200, "true");
                            }
                            else {
                                fireResponse(401, "false");
                            }
							
                        }
                    });	
   }

    function initResponse(resp) {
        res = resp;
    }

    //public
    return {
        getRequestType: getRequestType,
        capitalizeFirstLetter: capitalizeFirstLetter,
        getAllParameters: getAllParameters,
        BuildQuery: BuildQuery,
        getResponseString: getResponseString,
        responseToLogin: responseToLogin,
        initResponse: initResponse
    };
})();