const RequestLog = require('../models/RequestLog');

module.exports = function(context, endpoint, payload, error) {
    // let log = new RequestLog({
    //     type: "response",
    //     identifier: context.identifier,
    //     payload: JSON.stringify(payload),
    //     error: JSON.stringify(error),
    //     endpoint
    // });
    //
    // return log.save();
};
