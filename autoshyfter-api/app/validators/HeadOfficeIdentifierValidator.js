const Validator = require('./lib/Validator');
const models = require('../models/all');

/**
 * Validate a head office identifier
 * String
 */
class HeadOfficeIdentifierValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            if(!input.match(/^[a-z_]+$/)){
                return reject("InvalidIdentifier");
            }
            models.HeadOffice.findOne({ identifier: input })
                .then(head_office => {
                    if(head_office){
                        throw new Error("IdentifierConflict");
                    }
                })
                .then(() => {
                    resolve(input);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }
}

module.exports = HeadOfficeIdentifierValidator;