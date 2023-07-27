const Rule = require('./lib/Rule');

class HeadOfficeUpdateRule extends Rule {
    /**
     * Check if request can perform HeadOffice update
     * @param request
     * @returns {Promise<any>}
     */
    static can(request){
        return new Promise((resolve, reject) => {
            if(request.master){
                return resolve();
            } else {
                return reject("ForbiddenByHeadOfficeUpdateRule");
            }
        })
    }
}

module.exports = HeadOfficeUpdateRule;