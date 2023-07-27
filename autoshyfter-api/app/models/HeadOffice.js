const mongoose = require('mongoose');

let headOfficeSchema = mongoose.Schema({
    identifier: String,
    created_at: Date,
    updated_at: Date
});


headOfficeSchema.statics.findOneOrFail = function(id) {
    return new Promise((resolve, reject) => {
        this.findOne({ _id: id })
            .then(head_office => {
                if(head_office){
                    resolve(head_office);
                } else {
                    throw new Error("FailedToFindHeadOffice");
                }
            })
            .catch(e => {
                reject(e);
            })
    });
};

headOfficeSchema.methods.findAllVendors = function(cb) {
    return this.model('Vendor').find({ head_office_id: this._id }, cb);
};

module.exports = mongoose.model('HeadOffice', headOfficeSchema);