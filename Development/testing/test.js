var http = require('http');
var port = 1235;
var qs = require('querystring');

http.createServer(function (request, response) {
    
    console.log(request);
    if (request.method == "POST") {
           var body = [];
           request.on('data', function (chunk) {
         body.push(chunk);
            }).on('end', function () {
         body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
            console.log(body);
			
			response.writeHead(200, { 'Content-Type': 'text/plain' });
	     response.write("" + JSON.stringify(body));
         response.end("");
			
			});

	     
    }
    
   
	
}).listen(port);