const Rule = require('./lib/Rule');
const Employee = require('../models/Employee');

class EmployeeGetRule extends Rule {
    /**
     * Check if request can perform Employee get
     * @param request
     * @param data: data is employee ID in string format
     * @returns {Promise<any>}
     */
    static can(request, data) {
        return new Promise((resolve, reject) => {
            if (request.master) {
                return resolve();
            } else if (request.employee) {
                Employee.findOne({_id: data})
                    .then(employee => {
                        if(employee){
                            // Trying to get self
                            if(employee._id.toString() === request.employee._id.toString()){
                                return resolve();
                            // Administrator account
                            } else if (request.employee.role === 'admin' && employee.vendor_id.toString() === request.employee.vendor_id.toString()){
                                return resolve();
                            } else {
                                return reject("ForbiddenByEmployeeListRule");
                            }
                        } else {
                            return reject("ForbiddenByEmployeeListRule");
                        }
                    });
            } else {
                return reject("ForbiddenByEmployeeListRule");
            }
        })
    }
}

module.exports = EmployeeGetRule;