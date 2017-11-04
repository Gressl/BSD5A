module.exports = (function () {
    function getSingleParameters(requesturl) {
        try {
            var all = requesturl.split("?");


            if (all != undefined) {

                var split_1 = all[1].split("&");

                return split_1;
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

        if (input != undefined) {
            for (var i = 0; i < input.length; i++) {
                var split = input[i].split("=");
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

    function BuildQuery(parameters) {
        var querystring = "";
        if (parameters != undefined) {
            console.log("Parameter in db helper: " + parameters);
            switch (parameters[0].toLowerCase()) {

                case "get":
                    if (parameters.length <= 3) {
                        querystring = "Select * from " + capitalizeFirstLetter(parameters[2].toLowerCase());
                    } else if(parameters.length == 5) {
                        querystring = "Select * from " + capitalizeFirstLetter(parameters[2].toLowerCase()) + " WHERE " +  parameters[3] + " = \'" + parameters[4] + "\'";
                    } 
                    break;

                case "update":
                   
                    if (parameters.length == 7) {
                        var tablename = parameters[2];
                        var col_to_set = parameters[3];
                        var value_to_set = parameters[4];
                        var col_to_bind = parameters[5];
                        var col_bind_value = parameters[6];

                        querystring = "UPDATE " + capitalizeFirstLetter(tablename.toLowerCase()) + " SET " + col_to_set + " = \'" + value_to_set + "\' Where " + col_to_bind + " = " + col_bind_value;
                       
                    }
                    else {
                        return "parameter length is wrong";
                    }
                    break;

                case "remove":

                    break;

                case "add":

                    break;

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

            case "update":
                console.log("----" + JSON.stringify(sqlresult));
                return JSON.stringify(sqlresult);
                break;

            case "remove":

                break;

            case "add":

                break;

            default:
                return "Error";
                break;

        }
    }
   



    //public
    return {
        getSingleParameters: getSingleParameters,
        capitalizeFirstLetter: capitalizeFirstLetter,
        getAllParameters: getAllParameters,
        BuildQuery: BuildQuery,
        getResponseString: getResponseString
    };
})();