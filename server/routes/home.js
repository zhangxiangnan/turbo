var superagent = require('superagent');
var config = require('../config');

module.exports = route;

function route (app) {
    /* GET users listing. */
    app.get('/', function(req, res, next) {

        res.render('index', {
            title: ''
        });
        // should run `npm run mock`
        // superagent.get(config.host.REMOTE_API)
        //     .end(function(e, apiRes) {
        //         apiRes.text = JSON.parse(apiRes.text);
        //         res.render('index', {
        //             title: apiRes.text.body
        //         });
        //     });
    });
}
