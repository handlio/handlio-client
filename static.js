var connect = require('connect');
var serveStatic = require('serve-static');
var directory = './app';

var app = connect();

var port = 3001;
app.use(serveStatic(directory));
app.listen(port);

console.log('Listening on port ' + port);