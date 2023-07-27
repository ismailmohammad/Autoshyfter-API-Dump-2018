const Gate = require('./lib/Gate');
const EmployeeCreateRule = require('../rules/EmployeeCreateRule');
const EmployeeListRule = require('../rules/EmployeeListRule');
const EmployeeUpdateRule = require('../rules/EmployeeUpdateRule');
const EmployeeDeleteRule = require('../rules/EmployeeDeleteRule');
const EmployeeGetRule = require('../rules/EmployeeGetRule');


class EmployeeGate extends Gate {
    /**
     * Check if request can perform an action
     * @param action
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(action, request, data){
        switch(action){
            case "create":
                return EmployeeCreateRule.can(request, data);
            case "list":
                return EmployeeListRule.can(request, data);
            case "update":
                return EmployeeUpdateRule.can(request, data);
            case "delete":
                return EmployeeDeleteRule.can(request, data);
            case "get":
                return EmployeeGetRule.can(request, data);
            default:
                return new Promise((resolve, reject) => reject());
        }
    }
}

module.exports = EmployeeGate;