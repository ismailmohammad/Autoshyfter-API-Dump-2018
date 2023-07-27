const pbkdf2 = require('pbkdf2');
const uuid = require('uuid-v4');

// Mongoose models
const Employee = require('../models/Employee');
const EmployeeToken = require('../models/EmployeeToken');

// Util
const createRequestLog = require('../util/createRequestLog');
const createResponseLog = require('../util/createResponseLog');

/**
 * EmployeeTokenController
 */
class EmployeeTokenController {
    /**
     * Create a new employee token (login)
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        const ENDPOINT_NAME = "EmployeeTokenController.create";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            Employee.findOne({ vendor_id: args.vendor_id, username: args.username })
                .then(employee => {
                    if(employee){
                        let password = pbkdf2.pbkdf2Sync(args.password, process.env.SALT, 1, 32, 'sha512').toString('hex');
                        if(password === employee.password){
                            return Promise.resolve(employee);
                        }
                        return Promise.reject("InvalidPassword");
                    } else {
                        return Promise.reject("InvalidUsername");
                    }
                })
                .then(employee => {
                    let newToken = new EmployeeToken({
                        employee_id: employee._id,
                        body: employee._id.toString() + "-" + uuid() + "-" + employee.role + "-" + args.vendor_id,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                    return newToken.save();
                })
                .then(token => {
                    createResponseLog(context, ENDPOINT_NAME, token);
                    resolve(token);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }
}

module.exports = EmployeeTokenController;
