const HeadOfficeGate = require('../gates/HeadOfficeGate');
const VendorGate = require('../gates/VendorGate');
const EmployeeGate = require('../gates/EmployeeGate');
const RequestLogGate = require('../gates/RequestLogGate');

module.exports = (req, res, next) => {
    req.gates = {
        HeadOfficeGate,
        VendorGate,
        EmployeeGate,
        RequestLogGate
    };
    return next();
};