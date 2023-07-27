const Gate = require('./lib/Gate');

class GATENAME extends Gate {
    /**
     * Check if request can perform an action
     * @param action
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(action, request, data){
        switch(action){
            default:
                return new Promise((resolve, reject) => reject());
        }
    }
}

module.exports = GATENAME;
