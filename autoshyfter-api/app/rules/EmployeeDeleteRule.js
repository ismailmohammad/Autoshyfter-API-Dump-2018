const Rule = require('./lib/Rule');
const Employee = require('../models/Employee');


class EmployeeDeleteRule extends Rule {
    /**
     * Check if request can perform Employee deletion
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(request, data){
        return new Promise((resolve, reject) => {
            if(request.master){
                return resolve();
            } else {
                if(request.employee){
                    Employee.findOne({ _id: data.id })
                        .then(employee => {
                            if(employee){
                                // If current request employee is target employee's admin, approve
                                if(employee.vendor_id.toString() === request.employee.vendor_id.toString() && request.employee.role === 'admin'){
                                    return resolve();
                                } else {
                                    throw new Error("ForbiddenByEmployeeDeleteRule");
                                }
                            } else {
                                throw new Error("EmployeeNotFound");
                            }
                        })
                        .catch(e => {
                            reject(e);
                        })
                }
            }
        })
    }
}

module.exports = EmployeeDeleteRule;