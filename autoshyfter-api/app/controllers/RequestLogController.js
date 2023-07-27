// Mongoose models
const RequestLog = require('../models/RequestLog');

// Gates
const RequestLogGate = require('../gates/RequestLogGate');

/**
 * RequestLogController
 */
class RequestLogController {
    /**
     * List all request logs
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static list(obj, args, context) {
        return new Promise((resolve, reject) => {
            RequestLogGate.can("list", context)
                .then(() => {
                    return RequestLog.find(args);
                })
                .then(result => {
                    resolve(result);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    static headers(obj, args, context) {
        return JSON.stringify(obj.headers);
    }
}

module.exports = RequestLogController;
