const Validator = require('./lib/Validator');

/**
 * Validate a list of open hours
 * {
 *   String: [
 *     {
 *       from: String
 *       to: String
 *     }
 *   ]
 * }{0,*}
 */
class OpenHoursValidator extends Validator {
    static validate(input){
        return new Promise((resolve, reject) => {
            for(let i in input){
                for(let j in input[i]){
                    if(!input[i][j].from.match("^([0-1][0-9]|2[0-3]):[0-5][0-9]$")){
                        return reject("InvalidOpenTime");
                    }
                    if(!input[i][j].to.match("^([0-1][0-9]|2[0-3]):[0-5][0-9]$")){
                        return reject("InvalidOpenTime");
                    }
                }
            }
            resolve(input);
        });
    }
}

module.exports = OpenHoursValidator;