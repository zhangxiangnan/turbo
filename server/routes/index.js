module.exports = routes;

var fs = require('fs');

function routes(app) {
    fs.readdirSync('./server/routes/').forEach(function (file) {
        if (file.substr(-3) === '.js' && file.toString() !== 'index.js') {
            var route = require('./' + file);
            console.log(route);
            route(app);
        }
    });
}
