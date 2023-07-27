const Validator = require('./lib/Validator');

/**
 * Validate a phone number
 * String
 */
class EmailAddressValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            if(input === null || input === undefined || input.match(/\S+@\S+\.\S+/)){
                return resolve(input);
            }
            return reject("InvalidEmailAddress");
        });
    }
}

module.exports = EmailAddressValidator;