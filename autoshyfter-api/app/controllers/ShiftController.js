let _ = require('lodash');
// Mongoose Models
const Shift = require('../models/Shift');
const Vendor = require('../models/Vendor');
const Employee = require('../models/Employee');

// Gates
const ShiftGate = require('../gates/ShiftGate');


// Imports for Twilio
const accountSid = process.env.TWILIO_SID; 
const authToken = process.env.TWILIO_TOKEN; 
// const client = require('twilio')(accountSid, authToken); 
 


/**
 * ShiftController
 */
class ShiftController {
    /**
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        let vendorResult;
        let employeeResult;
        let message;
        return new Promise((resolve, reject) => {
                return Employee.findOne({ _id: args.shift.employee_id})
                .then(employee => {
                if (!employee) {
                    throw new Error("EmployeeNotFound");
                }
                employeeResult = employee;
                message = `Hey ${employeeResult.name}! You've been scheduled for a shift working as ${args.shift.label} on ${args.shift.date} from ${args.shift.from} to ${args.shift.to}. -AutoShyfter Team`;
                console.log(message);
                console.log('+' + employee.phone_number);
                // Find Vendor specified
                return Vendor.findOne({ _id: args.shift.vendor_id})
                })
                .then(vendor => {
                    if (!vendor) {
                        throw new Error("VendorNotFound");
                    }
                    vendorResult = vendor;
                    let dateIndex = _.findIndex(vendorResult.shift_dates, ['date', args.shift.date]);
                    console.log(dateIndex);
                    // console.log(vendorResult.shift_dates[dateIndex].employees);
                    let shiftContent = {
                        label: args.shift.label,
                        from: args.shift.from,
                        to: args.shift.to,
                        created_at: new Date(),
                        updated_at: new Date()
                    };
                    if (dateIndex !== -1) {
                        let employeeKey;
                        let employeeIndex = -1;
                        for (let i=0; i<vendorResult.shift_dates[dateIndex].employees.length; i++ ) {
                            console.log("Object: ", vendorResult.shift_dates[dateIndex].employees[i].employee_id);
                            employeeKey = _.findKey(vendorResult.shift_dates[dateIndex].employees[i], ['employee_id', args.shift.employee_id]);
                            if (employeeKey) {
                                employeeIndex = i;
                                break;
                            }
                        }
                        
                        console.log("THE KEY: ", employeeKey);
                        console.log(employeeIndex);
                        if (employeeIndex !== -1) {
                            vendorResult.shift_dates[dateIndex].employees[employeeIndex].shifts.push(shiftContent);
                            console.log("Ran 2");
                            return vendorResult.save();
                        } else {
                            // If the employee does not exist, add the shift as a new employee with the shift Data
                            vendorResult.shift_dates[dateIndex].employees.push({employee_id: args.shift.employee_id, shifts: shiftContent });
                            console.log("Ran 3");
                            return vendorResult.save();
                        }
                    } else {
                        let employees = [{
                            employee_id: args.shift.employee_id,
                            shifts: [shiftContent]
                        }];
                        let operational_load = [];
                        for (let x = 0; x < 24; x++) {
                            operational_load.push(Math.floor(Math.random() * 5) + 1);
                        }
                        vendorResult.shift_dates.push({
                            operational_load: operational_load,
                            date: args.shift.date,
                            employees: employees
                        });
                        return vendorResult.save();
                    }
                } )
                // .then(result => {
                //     // client.messages 
                //     //     .create({ 
                //     //         body: message, 
                //     //         from: '+14318318100',       
                //     //         to: "+" + employeeResult.phone_number
                //     //     }) 
                //     //     .then(message => console.log(message.sid)) 
                //     //     .done();
                //     resolve(result);
                // })
                .catch(e => {
                    reject(e);
                });
        })
    }

    /**
     * Update existing Shift
     *  - Can be updated if the Shift has not yet been settled
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static update(obj, args, context) {
        return new Promise((resolve, reject) => {
            let shift;
            return Shift.findById({ _id: args.id })
                .then(result => {
                    if (!result) {
                        throw new Error("ShiftNotFound");
                    }
                    // Avoid financial data mutation if already settled/handled by payout object
                    if (result.settled_at) {
                        throw new Error("ShiftAlreadySettled");
                    }
                    shift = result;
                    shift.set({
                        ...args.shift,
                        updated_at: new Date()
                    });
                    return shift.save();
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
     * Delete an existing Shift provided it has not been settled yet
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static delete(obj, args, context) {
        return new Promise((resolve, reject) => {
            return Shift.findOne({ _id: args.id})
                .then(shift => {
                    if (!shift) {
                        throw new Error("ShiftNotFound");
                    }
                    // Avoid financial data mutation if already settled/handled by payout object
                    if (shift.settled_at) {
                        throw new Error("ShiftAlreadySettled");
                    }
                    return shift.remove();
                })
                .then(() => {
                    resolve("ShiftRemoved");
                })
                .catch(e => {

                    reject(e);
                })
        })
    }

   /**
     * List all Shifts associated to specified Vendor
     *  - Ensure Vendor exists and then return all Shifts associated with it.
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static list(obj, args, context) {
        const ENDPOINT_NAME = "ShiftController.list";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            ShiftGate.can("list", context, args)
                .then(() => {
                    return Vendor.findOne({ _id: args.vendor_id });
                })
                .then(result => {
                    if (!result) {
                        throw new Error("VendorNotFound");
                    }
                    return Shift.find({ vendor_id: args.vendor_id });
                })
                .then(shifts => {
                    createResponseLog(context, ENDPOINT_NAME, shifts);
                    resolve(shifts);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

    /**
     * Get a single Shift based on specified id
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static getOne(obj, args, context) {
        const ENDPOINT_NAME = "ShiftController.getOne";
        createRequestLog(context, ENDPOINT_NAME);
        return new Promise((resolve, reject) => {
            ShiftGate.can("getOne", context, args)
                .then(() => {
                    return Shift.findOne({ _id: args._id });
                })
                .then(shift => {
                    if (!shift) {
                        throw new Error("ShiftNotFound");
                    }
                    createResponseLog(context, ENDPOINT_NAME, shift);
                    resolve(shift);
                })
                .catch(e => {
                    createResponseLog(context, ENDPOINT_NAME, null, e);
                    reject(e);
                })
        })
    }

}

module.exports = ShiftController;