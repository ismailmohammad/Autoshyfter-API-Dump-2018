const Rule = require('./lib/Rule');

class VendorUpdateRule extends Rule {
    /**
     * Check if request can perform Vendor update
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(request, data){
        return new Promise((resolve, reject) => {
            if(request.master){
                return resolve();
            } else {
                if(request.employee && request.employee.vendor_id.toString() === data.id && request.employee.role === 'admin'){
                    resolve();
                } else {
                    return reject("ForbiddenByVendorUpdateRule");
                }
            }
        })
    }
}

module.exports = VendorUpdateRule;