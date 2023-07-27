module.exports = () => {
    return {
        HeadOfficeController: require('./HeadOfficeController'),
        VendorController: require('./VendorController'),
        EmployeeController: require('./EmployeeController'),
        EmployeeTokenController: require('./EmployeeTokenController'),
        RequestLogController: require('./RequestLogController'),
        MiscController: require('./MiscController'),
        ShiftController: require('./ShiftController')
    };
};
