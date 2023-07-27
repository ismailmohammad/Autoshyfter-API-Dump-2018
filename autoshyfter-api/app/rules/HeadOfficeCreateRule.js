const Rule = require('./lib/Rule');

class HeadOfficeCreateRule extends Rule {
    /**
     * Check if request can perform HeadOffice creation
     * @param request
     * @returns {Promise<any>}
     */
    static can(request){
        return new Promise((resolve, reject) => {
            if(request.master){
                return resolve();
            } else {
                return reject("ForbiddenByHeadOfficeCreateRule");
            }
        })
    }
}

module.exports = HeadOfficeCreateRule;