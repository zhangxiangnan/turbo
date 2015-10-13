module.exports = middleware;

var fs = require('fs');

function middleware(app) {
    fs.readdirSync('./server/middleware/').forEach(function (file) {
        if (
            file.substr(-3) === '.js' &&
            file.toString() !== 'index.js' &&
            file.toString() !== 'error.js'
        ) {
            require('./' + file)(app);
        }
    });

    // Final handle errors
    // require('./server/middleware/errors')(app);
}
