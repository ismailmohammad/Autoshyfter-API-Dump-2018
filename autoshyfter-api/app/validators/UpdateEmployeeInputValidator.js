const Validator = require('./lib/Validator');
const PhoneNumberValidator = require('./PhoneNumberValidator');
const EmailAddressValidator = require('./EmailAddressValidator');

/**
 * Deep validation for CreateEmployeeInput
 */
class UpdateEmployeeInputValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            PhoneNumberValidator.validate(input.phone_number)
                .then(() => {
                    return EmailAddressValidator.validate(input.email_address);
                })
                .then(() => {
                    if(input.password && !input.password.match(/^.{8,}$/)){
                        return reject("InvalidPassword");
                    }
                })
                .then(() => {
                    return resolve(input);
                })
                .catch(e => {
                    return reject(e);
                })
        });
    }

}

module.exports = UpdateEmployeeInputValidator;