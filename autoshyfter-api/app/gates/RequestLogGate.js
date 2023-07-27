const Gate = require('./lib/Gate');
const RequestLogListRule = require('../rules/RequestLogListRule');

class RequestLogGate extends Gate {
    /**
     * Check if request can perform an action
     * @param action
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(action, request, data){
        switch(action){
            case "list":
                return RequestLogListRule.can(request, data);
            default:
                return new Promise((resolve, reject) => reject());
        }
    }
}

module.exports = RequestLogGate;