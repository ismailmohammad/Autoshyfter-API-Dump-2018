const version = require('../resources/version');

class MiscController {
    static version(req, res) {
        res.send(version);
    }

    static createdAtToISOHelper(obj) {
        return new Date(obj.created_at).toISOString();
    }

    static updatedAtToISOHelper(obj) {
        return new Date(obj.updated_at).toISOString();
    }
}

module.exports = MiscController;
