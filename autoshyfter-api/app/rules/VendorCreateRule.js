const Rule = require('./lib/Rule');

class VendorCreateRule extends Rule {
    /**
     * Check if request can perform Vendor creation
     * @param request
     * @returns {Promise<any>}
     */
    static can(request){
        return new Promise((resolve, reject) => {
            if(request.master){
                return resolve();
            } else {
                return reject("ForbiddenByVendorCreateRule");
            }
        })
    }
}

module.exports = VendorCreateRule;