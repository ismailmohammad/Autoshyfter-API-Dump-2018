const Rule = require('./lib/Rule');

class HeadOfficeDeleteRule extends Rule {
    /**
     * Check if request can perform HeadOffice deletion
     * @param request
     * @returns {Promise<any>}
     */
    static can(request){
        return new Promise((resolve, reject) => {
            if(request.master){
                return resolve();
            } else {
                return reject("ForbiddenByHeadOfficeDeleteRule");
            }
        })
    }
}

module.exports = HeadOfficeDeleteRule;