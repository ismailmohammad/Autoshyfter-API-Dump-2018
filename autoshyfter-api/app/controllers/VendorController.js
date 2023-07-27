// Mongoose models
const HeadOffice = require('../models/HeadOffice');
const Vendor = require('../models/Vendor');
const Employee = require('../models/Employee');

// Gates
const VendorGate = require('../gates/VendorGate');
const EmployeeGate = require('../gates/EmployeeGate');

// Validators
const CreateVendorInputValidator = require('../validators/CreateVendorInputValidator');
const UpdateVendorInputValidator = require('../validators/UpdateVendorInputValidator');

// Util
const createRequestLog = require('../util/createRequestLog');
const createResponseLog = require('../util/createResponseLog');

/**
 * VendorController
 */
class VendorController {
    /**
     * Create a new vendor
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        return new Promise((resolve, reject) => {
            VendorGate.can("create", context)
                .then(() => {
                    return CreateVendorInputValidator.validate(args.vendor)
                })
                .then(input => {
                    args.vendor = input;
                    return HeadOffice.findOne({_id: args.vendor.head_office_id});
                })
                .then(head_office => {
                    if (head_office) {
                        let newVendor = new Vendor({
                            ...args.vendor,
                            timezone: "America/Toronto",
                            status: "hidden"
                        });
                        return newVendor.save();
                    } else {
                        return Promise.reject("InvalidHeadOffice");
                    }
                })
                .then(result => {
                    resolve(result);
                })
                .catch(e => {
                    reject(e);
                });
        });
    }

    /**
     * Update an existing vendor
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static update(obj, args, context) {
        const ENDPOINT_NAME = "VendorController.update";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            let vendor = null;
            VendorGate.can("update", context, args)
                .then(() => {
                    return Vendor.findOneOrFail(args.id);
                })
                .then(result => {
                    vendor = result;
                    return UpdateVendorInputValidator.validate(args.vendor);
                })
                .then(() => {
                    vendor.set({
                        ...args.vendor
                    });
                    return vendor.save();
                })
                .then(vendor => {
                    createResponseLog(context, ENDPOINT_NAME, vendor);
                    resolve(vendor);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Fetch vendors based on filter
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static get(obj, args, context) {
        return new Promise((resolve, reject) => {
            Vendor.find({
                ...args
            })
                .then(result => {
                    resolve(result);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    /**
     * Get head_office associated with this vendor
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static head_office(obj, args, context) {
        const ENDPOINT_NAME = "VendorController.head_office";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            HeadOffice.findOne({_id: obj.head_office_id})
                .then(result => {
                    createResponseLog(context, ENDPOINT_NAME, result);
                    resolve(result);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                });
        })
    }

    /**
     * Get all employees associated with this vendor
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static employees(obj, args, context) {
        const ENDPOINT_NAME = "VendorController.employees";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            EmployeeGate.can("list", context, obj._id.toString())
                .then(() => {
                    return Employee.find({vendor_id: obj._id});
                })
                .then(employees => {
                    createResponseLog(context, ENDPOINT_NAME, employees);
                    resolve(employees);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }
}

module.exports = VendorController;
