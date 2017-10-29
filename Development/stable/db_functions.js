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

            switch (parameters[0].toLowerCase()) {
                case "table":
                    if (parameters.length == 2) {
                        querystring = "Select * from " + capitalizeFirstLetter(parameters[1].toLowerCase());
                    }
                    break;

                case "user":

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

   



    //public
    return {
        getSingleParameters: getSingleParameters,
        capitalizeFirstLetter: capitalizeFirstLetter,
        getAllParameters: getAllParameters,
        BuildQuery: BuildQuery
    };
})();