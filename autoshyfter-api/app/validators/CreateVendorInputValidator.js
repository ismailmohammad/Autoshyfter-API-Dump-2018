const Validator = require('./lib/Validator');
const TagListValidator = require('./TagListValidator');
const OpenHoursValidator = require('./OpenHoursValidator');
const PhoneNumberValidator = require('./PhoneNumberValidator');

/**
 * Deep validation for CreateVendorInput
 */
class CreateVendorInputValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            TagListValidator.validate(input.tags)
                .then(() => {
                    return OpenHoursValidator.validate(input.open_hours);
                })
                .then(() => {
                    return PhoneNumberValidator.validate(input.phone_number);
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

module.exports = CreateVendorInputValidator;