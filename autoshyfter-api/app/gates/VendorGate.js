const Gate = require('./lib/Gate');
const VendorCreateRule = require('../rules/VendorCreateRule');
const VendorUpdateRule = require('../rules/VendorUpdateRule');

class VendorGate extends Gate {
    /**
     * Check if request can perform an action
     * @param action
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(action, request, data){
        switch(action){
            case "create":
                return VendorCreateRule.can(request, data);
            case "update":
                return VendorUpdateRule.can(request, data);
            default:
                return new Promise((resolve, reject) => reject());
        }
    }
}

module.exports = VendorGate;