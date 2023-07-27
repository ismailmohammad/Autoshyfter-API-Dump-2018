const Validator = require('./lib/Validator');

/**
 * Validate a list of tags
 * [
 *   {
 *     name: String
 *     identifier: String [a-z_]{1,64}
 *   }
 * ]{0,*}
 */
class TagListValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            if(!input) return resolve(input);
            for(let i in input){
                if(!input[i].name || !input[i].identifier.match(/^[a-z_]{1,64}$/)){
                    return reject("InvalidTag");
                }
            }
            resolve(input);
        });
    }
}

module.exports = TagListValidator;