const Rule = require('./lib/Rule');

class EmployeeListRule extends Rule {
    /**
     * Check if request can perform Employee listing
     * @param request
     * @param data: data is vendor ID in string format
     * @returns {Promise<any>}
     */
    static can(request, data) {
        return new Promise((resolve, reject) => {
            if (request.master) {
                return resolve();
            } else if (request.employee && request.employee.role === 'admin' && request.employee.vendor_id.toString() === data) {
                // If currently authenticated employee is admin of the vendor
                return resolve();
            } else {
                return reject("ForbiddenByEmployeeListRule");
            }
        })
    }
}

module.exports = EmployeeListRule;