const createError = require('http-errors');
const logError = (error) => {
};
const logErrorMiddleware = (error, req, res, next) => {
    logError(error);
    next(error);
};
 function errorHandler(error, req, res, next) {
    const statusCode = error.status || 500;
    res.status(statusCode);
    if (error.contents) {
        return res.json({
            status: statusCode,
            message: error.message,
            errors: error.contents,
        });
    }
    return res.json({ status: statusCode, message: error.message });
}

module.exports = {
    logError, createError,logErrorMiddleware, errorHandler
}