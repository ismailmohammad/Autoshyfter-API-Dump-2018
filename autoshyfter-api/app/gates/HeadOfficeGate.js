const Gate = require('./lib/Gate');
const HeadOfficeCreateRule = require('../rules/HeadOfficeCreateRule');
const HeadOfficeUpdateRule = require('../rules/HeadOfficeUpdateRule');
const HeadOfficeDeleteRule = require('../rules/HeadOfficeDeleteRule');

class HeadOfficeGate extends Gate {
    /**
     * Check if request can perform an action
     * @param action
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(action, request, data) {
        switch (action) {
            case "create":
                return HeadOfficeCreateRule.can(request, data);
            case "update":
                return HeadOfficeUpdateRule.can(request, data);
            case "delete":
                return HeadOfficeDeleteRule.can(request, data);
            default:
                return new Promise((resolve, reject) => reject());
        }
    }
}

module.exports = HeadOfficeGate;