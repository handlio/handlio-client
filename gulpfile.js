var fs = require('fs');

var tasks = fs.readdirSync('./build');

tasks.forEach(function (taskName) {
    require('./build/' + taskName);
});