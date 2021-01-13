module.exports = function  Authentication(req, res, next) {
    console.log('Authenticated...');
    next();
}