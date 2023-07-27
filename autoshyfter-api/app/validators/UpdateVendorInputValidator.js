const Validator = require('./lib/Validator');
const TagListValidator = require('./TagListValidator');
const OpenHoursValidator = require('./OpenHoursValidator');
const PhoneNumberValidator = require('./PhoneNumberValidator');

/**
 * Deep validation for UpdateVendorInput
 */
class UpdateVendorInputValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            TagListValidator.validate(input.tags)
                .then(() => {
                    return OpenHoursValidator.validate(input.open_hours);
                })
                .then(() => {
                    if(input.phone_number){
                        return PhoneNumberValidator.validate(input.phone_number);
                    }
                })
                .then(() => {
                    if(input.status){
                        if(['open', 'closed', 'hidden', 'not_accepting'].indexOf(input.status) < 0){
                            return Promise.reject("InvalidStatus");
                        }
                    }
                })
                .then(() => {
                    return resolve(input);
                })
                .catch(e => {
                    return reject(e);
                });
        });
    }

}

module.exports = UpdateVendorInputValidator;