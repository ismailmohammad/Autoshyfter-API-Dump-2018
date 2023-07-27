const Validator = require('./lib/Validator');
const PhoneNumberValidator = require('./PhoneNumberValidator');
const EmailAddressValidator = require('./EmailAddressValidator');

/**
 * Deep validation for CreateEmployeeInput
 */
class CreateEmployeeInputValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            if(!input.username.match(/^[a-z0-9_-]+$/)){
                return reject("InvalidUsername");
            }
            if(!input.password.match(/^.{8,}$/)){
                return reject("InvalidPassword");
            }
            if(!input.role.match(/^(admin|user)$/)){
                return reject("InvalidRole");
            }
            PhoneNumberValidator.validate(input.phone_number)
                .then(() => {
                    return EmailAddressValidator.validate(input.email_address);
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

module.exports = CreateEmployeeInputValidator;