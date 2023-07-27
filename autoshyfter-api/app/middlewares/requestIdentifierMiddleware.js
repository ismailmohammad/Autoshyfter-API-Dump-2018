const uuid = require('uuid-v4');

module.exports = (req, res, next) => {
    req.identifier = uuid() + '-' + new Date().getTime();
    return next();
};