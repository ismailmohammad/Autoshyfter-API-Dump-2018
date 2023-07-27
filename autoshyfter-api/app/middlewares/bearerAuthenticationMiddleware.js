/**
 * UNLICENSED
 * Middleware to check authentication status
 */

module.exports = function (models) {
    return function (req, res, next) {
        req.models = models;
        if(req.header('authorization')){
            models.EmployeeToken.findOne({ body: req.header('authorization') })
                .then(token => {
                    if(token){
                        return models.Employee.findOne({ _id: token.employee_id })
                    } else {
                        return Promise.reject();
                    }
                })
                .then(employee => {
                    if(employee) req.employee = employee;
                    next();
                })
                .catch((e) => {
                    next();
                })
        } else {
            next();
        }
    }
};