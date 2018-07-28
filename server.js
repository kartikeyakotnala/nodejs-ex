
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(port,ip);