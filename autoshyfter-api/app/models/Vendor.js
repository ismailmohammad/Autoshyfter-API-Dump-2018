const mongoose = require('mongoose');

let shift = mongoose.Schema({
    label: String,
    from: String,
    to: String
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

let shift_employee = mongoose.Schema({
    employee_id: String,
    shifts: [shift]
}, {_id: false});

let shiftDay = mongoose.Schema({
    date: String,
    operational_load: [Number],
    employees: [shift_employee]
}, {_id: false});

let vendorSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        images: [String],
        address: String,
        phone_number: String,
        timezone: String,
        is_test: Boolean,
        location: {
            longitude: Number,
            latitude: Number
        },
        open_hours: {
            monday: [
                {
                    from: String,
                    to: String
                }
            ],
            tuesday: [
                {
                    from: String,
                    to: String
                }
            ],
            wednesday: [
                {
                    from: String,
                    to: String
                }
            ],
            thursday: [
                {
                    from: String,
                    to: String
                }
            ],
            friday: [
                {
                    from: String,
                    to: String
                }
            ],
            saturday: [
                {
                    from: String,
                    to: String
                }
            ],
            sunday: [
                {
                    from: String,
                    to: String
                }
            ]
        },
        head_office_id: mongoose.SchemaTypes.ObjectId,
        status: String,
        shift_dates: [shiftDay]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

vendorSchema.statics.findOneOrFail = function (id) {
    return new Promise((resolve, reject) => {
        this.findOne({_id: id})
            .then(vendor => {
                if (vendor) {
                    resolve(vendor);
                } else {
                    throw new Error("FailedToFindVendor");
                }
            })
            .catch(e => {
                reject(e);
            })
    });
};

module.exports = mongoose.model('Vendor', vendorSchema);