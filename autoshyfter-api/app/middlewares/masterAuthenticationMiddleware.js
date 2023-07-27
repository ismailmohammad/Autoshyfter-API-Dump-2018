module.exports = (req, res, next) => {
    if(req.header('authorization') === process.env.MASTER_TOKEN){
        req.master = true;
    }
    return next();
};