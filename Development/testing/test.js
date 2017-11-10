var http = require('http');
var port = 1235;
var qs = require('querystring');

http.createServer(function (request, response) {
    
    
	 var buffer = new Buffer(request.headers.authorization.split(" ")[1], 'base64')
     var s = b.toString();
	
	console.log(s);
	
    if (request.method == "POST") {
         var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
			
			 var post = qs.parse(body);
			 
			 response.writeHead(200, { 'Content-Type': 'text/plain' });
	     response.write(post["table"] + "-----" + JSON.stringify(post) + "just body" + post);
         response.end("");
			
        });
		}
		
		response.writeHead(200, { 'Content-Type': 'text/plain' });
	     response.write("get");
         response.end("");

}).listen(port);