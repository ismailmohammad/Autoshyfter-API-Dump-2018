const RequestLog = require('../models/RequestLog');

module.exports = function(context, endpoint) {
    // let log = new RequestLog({
    //     type: "request",
    //     identifier: context.identifier,
    //     ip: context.headers['x-forwarded-for'] || context.connection.remoteAddress,
    //     headers: context.headers,
    //     payload: JSON.stringify(context.body),
    //     endpoint
    // });
    //
    // return log.save();
};
