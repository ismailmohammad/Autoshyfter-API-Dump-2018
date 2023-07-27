const Gate = require('./lib/Gate');

class ShiftGate extends Gate {
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
                return true;
            case "update":
                return true;
            default:
                return new Promise((resolve, reject) => reject());
        }
    }
}

module.exports = ShiftGate;