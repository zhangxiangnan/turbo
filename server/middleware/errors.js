// Handle Error Middleware
var config = require('../config');

module.exports = function (app) {
    app.use(notFoundError);
    app.use(generalError);
};

/**
 * @desc use to descript error route, like '/error'
 */
function customError (req, res, next) {
    var query = req.query,
        err = new Error(query.title || 'UnknownError'),
        status = query.status || 500,
        title = 'HTTP/1.1' + status + ' {' + (err.message) + '}',
        text = query.text || '';

    res.status(status).render('error', {
        title: title,
        text: text
    });
}

/**
 * @desc caused by Node.JS server Error
 */
function generalError (err, req, res, next) {
    var status = err.status || 500,
        title = 'HTTP/1.1' + status + ' {' + (err.message) + '}',
        text = config.isDev() ? err.stack : '';

    res.status(status).render('error', {
        title: title,
        text: text
    });
}

/**
 * @desc not Found 404
 */
function notFoundError (req, res, next) {
    var err = new Error('Not Found'),
        status = 404,
        title = 'HTTP/1.1 404 Not Found',
        text = config.isDev() ? err.stack : '';

    res.status(status).render('error', {
        title: title,
        text: text
    });
}
