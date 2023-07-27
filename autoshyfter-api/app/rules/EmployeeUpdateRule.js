const Rule = require('./lib/Rule');
const Employee = require('../models/Employee');


class EmployeeUpdateRule extends Rule {
    /**
     * Check if request can perform Employee update
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
                    // Updating self, approve
                    if(request.employee._id.toString() === data.id){
                        return resolve();
                    }
                    Employee.findOne({ _id: data.id })
                        .then(employee => {
                            if(employee){
                                // If current request employee is target employee's admin, approve
                                if(employee.vendor_id.toString() === request.employee.vendor_id.toString() && request.employee.role === 'admin'){
                                    return resolve();
                                } else {
                                    throw new Error("ForbiddenByUpdateEmployeeRule");
                                }
                            } else {
                                throw new Error("EmployeeNotFound");
                            }
                        })
                        .catch(e => {
                            reject(e);
                        })
                } else {
                    reject("ForbiddenByUpdateEmployeeRule");
                }
            }
        })
    }
}

module.exports = EmployeeUpdateRule;