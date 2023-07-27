const Rule = require('./lib/Rule');

class RULENAME extends Rule {
    /**
     * Check if request can perform ...
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(request, data){
        return new Promise((resolve, reject) => {
            if(request.master){
                return resolve();
            } else {
                // Put rules here
            }
        })
    }
}

module.exports = RULENAME;
