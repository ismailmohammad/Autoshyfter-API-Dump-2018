module.exports =
    require('./types/Query') +
    require('./types/RequestLog') +
    require('./types/HeadOffice') +
    require('./types/Vendor') +
    require('./types/Employee') +
    require('./types/EmployeeToken') +
    require('./types/OpenHours') +
    require('./types/TimeSpan') +
    require('./types/Location') +
    require('./types/ShiftDay') +
    require('./types/ShiftEmployee') + 
    require('./types/Shift') +
    require('./types/AvailabilityDetails') + 
    require('./types/AvailableHours') + 

    require('./types/Mutation') +

    require('./inputs/CreateVendorInput') +
    require('./inputs/UpdateVendorInput') +
    require('./inputs/CreateEmployeeInput') +
    require('./inputs/UpdateEmployeeInput') +
    require('./inputs/OpenHoursInput') +
    require('./inputs/TimeSpanInput') +
    require('./inputs/LocationInput') +
    require('./inputs/ShiftEmployeeInput') + 
    require('./inputs/ShiftInput') + 
    require('./inputs/ShiftDayInput') + 
    require('./inputs/AvailabilityDetailsInput') + 
    require('./inputs/AvailableHoursInput') + 
    require('./inputs/CreateShiftInput') + 
    require('./inputs/UpdateShiftInput')
;
