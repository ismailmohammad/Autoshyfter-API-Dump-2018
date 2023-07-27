// Mongoose models
const HeadOffice = require('../models/HeadOffice');
const Vendor = require('../models/Vendor');

// Validators
const HeadOfficeIdentifierValidator = require('../validators/HeadOfficeIdentifierValidator');

// Gates
const HeadOfficeGate = require('../gates/HeadOfficeGate');

// Util
const createRequestLog = require('../util/createRequestLog');
const createResponseLog = require('../util/createResponseLog');


/**
 * HeadOfficeController
 */
class HeadOfficeController {
    /**
     * Create a new head office
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        const ENDPOINT_NAME = "HeadOfficeController.create";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            HeadOfficeGate.can("create", context)
                .then(() => {
                    return HeadOfficeIdentifierValidator.validate(args.identifier);
                })
                .then(() => {
                    let newHeadOffice = new HeadOffice({
                        identifier: args.identifier,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                    return newHeadOffice.save();
                })
                .then(result => {
                    createResponseLog(context, ENDPOINT_NAME, result);
                    resolve(result);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Update an existing head office
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static update(obj, args, context) {
        const ENDPOINT_NAME = "HeadOfficeController.update";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            let head_office = null;
            HeadOfficeGate.can("update", context)
                .then(() => {
                    return HeadOffice.findOneOrFail(args.id);
                })
                .then(result => {
                    head_office = result;
                    if (args.identifier) return HeadOfficeIdentifierValidator.validate(args.identifier);
                })
                .then(() => {
                    if (args.identifier) {
                        head_office.identifier = args.identifier;
                    }
                    head_office.updated_at = new Date();
                    return head_office.save();
                })
                .then(head_office => {
                    createResponseLog(context, ENDPOINT_NAME, head_office);
                    resolve(head_office);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Delete an existing head office
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static delete(obj, args, context) {
        const ENDPOINT_NAME = "HeadOfficeController.delete";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            let head_office = null;
            HeadOfficeGate.can("delete", context)
                .then(() => {
                    return HeadOffice.findOneOrFail(args.id);
                })
                .then(result => {
                    head_office = result;
                    return head_office.findAllVendors();
                })
                .then(vendors => {
                    if (vendors.length > 0) {
                        throw new Error("HeadOfficeContainsVendor");
                    }
                })
                .then(() => {
                    return head_office.remove();
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
     * Get head offices by filter
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static get(obj, args, context) {
        const ENDPOINT_NAME = "HeadOfficeController.get";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            HeadOffice.find({...args})
                .then(result => {
                    createResponseLog(context, ENDPOINT_NAME, result);
                    resolve(result);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Get all vendors
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static vendors(obj, args, context){
        const ENDPOINT_NAME = "HeadOfficeController.vendors";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            Vendor.find({head_office_id: obj._id})
                .then(result => {
                    createResponseLog(context, ENDPOINT_NAME, result);
                    resolve(result);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }
}

module.exports = HeadOfficeController;
