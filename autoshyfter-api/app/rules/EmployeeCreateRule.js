const Rule = require('./lib/Rule');

class EmployeeCreateRule extends Rule {
    /**
     * Check if request can perform Employee creation
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(request, data){
        return new Promise((resolve, reject) => {
            if(request.master){
                return resolve();
            } else {
                // Allow admins
                if(request.employee && request.employee.vendor_id.toString() === data.employee.vendor_id && request.employee.role === 'admin'){
                    return resolve();
                }
                return reject("ForbiddenByEmployeeCreateRule");
            }
        })
    }
}

module.exports = EmployeeCreateRule;