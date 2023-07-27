const mongoose = require('mongoose');

let availableHours = mongoose.Schema({
    // The status can either be "available" or "undesirable"
    status: String,
    to: String,
    from: String
});

let availabilityDetails = mongoose.Schema({
    date: String,
    hours: [availableHours]
});

let employeeSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
    email_address: String,
    phone_number: String,
    vendor_id: mongoose.SchemaTypes.ObjectId,
    availability:[availabilityDetails],
    image: String,
    name: String,
    created_at: Date,
    updated_at: Date
});

employeeSchema.methods.isAdmin = function() {
    return this.role === 'admin';
};

employeeSchema.statics.findOneOrFail = function(id) {
    return new Promise((resolve, reject) => {
        this.findOne({ _id: id })
            .then(employee => {
                if(employee){
                    resolve(employee);
                } else {
                    throw new Error("FailedToFindEmployee");
                }
            })
            .catch(e => {
                reject(e);
            })
    });
};

module.exports = mongoose.model('Employee', employeeSchema);