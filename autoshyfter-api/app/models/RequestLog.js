const mongoose = require('mongoose');

let requestLogSchema = mongoose.Schema(
    {
        type: String, // Can be request or response
        identifier: String, // UUID
        endpoint: String,

        // Request specific
        ip: String,
        headers: mongoose.SchemaTypes.Mixed,

        // Response specific
        error: String,

        // For both
        payload: String
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model('RequestLog', requestLogSchema);