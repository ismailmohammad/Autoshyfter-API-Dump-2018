const pbkdf2 = require('pbkdf2');

// Mongoose models
const Vendor = require('../models/Vendor');
const Employee = require('../models/Employee');

// Gates
const EmployeeGate = require('../gates/EmployeeGate');

// Validators
const CreateEmployeeInputValidator = require('../validators/CreateEmployeeInputValidator');
const UpdateEmployeeInputValidator = require('../validators/UpdateEmployeeInputValidator');

// Util
const createRequestLog = require('../util/createRequestLog');
const createResponseLog = require('../util/createResponseLog');

/**
 * EmployeeController
 */
class EmployeeController {
    /**
     * Create a new employee under vendor
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        const ENDPOINT_NAME = "EmployeeController.create";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            EmployeeGate.can("create", context, args)
                .then(() => {
                    return CreateEmployeeInputValidator.validate(args.employee);
                })
                .then(() => {
                    return Vendor.findOne({_id: args.employee.vendor_id});
                })
                .then(result => {
                    if (result) {
                        return Promise.resolve();
                    }
                    return Promise.reject("InvalidVendorID");
                })
                .then(() => {
                    return Employee.findOne({
                        username: args.employee.username,
                        vendor_id: args.employee.vendor_id
                    });
                })
                .then(result => {
                    if (!result) {
                        // Everything is validated, now create the employee
                        let newEmployee = new Employee({
                            ...args.employee,
                            terminal_fcm_tokens: [],
                            password: pbkdf2.pbkdf2Sync(args.employee.password, process.env.SALT, 1, 32, 'sha512').toString('hex'),
                            created_at: new Date(),
                            updated_at: new Date()
                        });
                        return newEmployee.save();
                    }
                    return Promise.reject("UsernameConflict");
                })
                .then(employee => {
                    createResponseLog(context, ENDPOINT_NAME, employee);
                    resolve(employee);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Get an employee account
     * @param obj
     * @param args
     * @param context
     * @returns {*}
     */
    static get(obj, args, context) {
        const ENDPOINT_NAME = "EmployeeController.get";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            EmployeeGate.can("get", context, args._id)
                .then(() => {
                    return Employee.findOne({_id: args._id});
                })
                .then(employee => {
                    if(employee){
                        createResponseLog(context, ENDPOINT_NAME, employee);
                        resolve(employee);
                    } else {
                        throw new Error("EmployeeNotFound");
                    }
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Update an employee
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static update(obj, args, context) {
        const ENDPOINT_NAME = "EmployeeController.update";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            let employee = null;
            EmployeeGate.can("update", context, args)
                .then(() => {
                    return UpdateEmployeeInputValidator.validate(args.employee);
                })
                .then(() => {
                    return Employee.findOneOrFail(args.id);
                })
                .then(result => {
                    employee = result;
                })
                .then(() => {
                    let updateParams = { ...args.employee, updated_at: new Date() };
                    if (args.employee.password) {
                        updateParams.password = pbkdf2.pbkdf2Sync(args.employee.password, process.env.SALT, 1, 32, 'sha512').toString('hex');
                    }
                    employee.set(updateParams);
                    return employee.save();
                })
                .then(employee => {
                    createResponseLog(context, ENDPOINT_NAME, employee);
                    resolve(employee);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Delete an employee
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static delete(obj, args, context) {
        const ENDPOINT_NAME = "EmployeeController.delete";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            let employee = null;
            EmployeeGate.can("delete", context, args)
                .then(() => {
                    return Employee.findOneOrFail(args.id);
                })
                .then(result => {
                    employee = result;
                })
                .then(() => {
                    return employee.remove();
                })
                .then(() => {
                    createResponseLog(context, ENDPOINT_NAME, "Removed");
                    resolve("Removed");
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Get currently authenticated employee
     * @param obj
     * @param args
     * @param context
     * @returns {*}
     */
    static getCurrent(obj, args, context) {
        return context.employee;
    }

    /**
     * Get vendor object this employee is under
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static vendor(obj, args, context) {
        return new Promise((resolve, reject) => {
            Vendor.findOne({_id: obj.vendor_id})
                .then(result => {
                    resolve(result);
                })
                .catch(e => {
                    reject(e);
                });
        })
    }
}

module.exports = EmployeeController;
