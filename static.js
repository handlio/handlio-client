var connect = require('connect');
var path = require('path');
var fs = require('fs');
var serveStatic = require('serve-static');
var directory = './app';

var app = connect();

var port = 3001;
app.use(serveStatic(directory));
app.use(function (req, res) {
    var indexPath = path.join(directory, 'index.html');
    var stat = fs.statSync(indexPath);

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(indexPath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
});
app.listen(port);

console.log('Listening on port ' + port);