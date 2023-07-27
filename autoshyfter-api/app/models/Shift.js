const mongoose = require('mongoose');

let shiftSchema = mongoose.Schema({
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

module.exports = mongoose.model('Shift', shiftSchema);