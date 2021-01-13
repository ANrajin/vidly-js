module.exports = function Logger(req, res, next) {
    console.log('logged...');
    next();
}