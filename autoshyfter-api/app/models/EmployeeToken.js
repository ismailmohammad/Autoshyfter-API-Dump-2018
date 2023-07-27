const mongoose = require('mongoose');

let employeeTokenSchema = mongoose.Schema({
    employee_id: mongoose.SchemaTypes.ObjectId,
    body: String,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('EmployeeToken', employeeTokenSchema);