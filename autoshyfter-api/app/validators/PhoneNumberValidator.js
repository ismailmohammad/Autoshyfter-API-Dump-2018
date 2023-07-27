const Validator = require('./lib/Validator');

/**
 * Validate a phone number
 * String
 */
class PhoneNumberValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            // Only accept Canadian / US numbers
            if(input === null || input === undefined || input.match(/^1[0-9]{10}$/)){
                return resolve(input);
            }
            return reject("InvalidPhoneNumber");
        });
    }
}

module.exports = PhoneNumberValidator;