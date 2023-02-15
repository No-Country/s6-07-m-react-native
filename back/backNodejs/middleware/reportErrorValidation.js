const { validationResult } = require("express-validator");
const createError = require("http-errors");
const { errorHandler } = require("./error.handler")
const errorValidationFormatter = ({
  location, msg, param, value, nestedErrors,
}) => `${location}[${param}]: ${msg}`;

const reportError = (req, res, next) => {
  const result = validationResult(req).formatWith(errorValidationFormatter);
  if (!result.isEmpty()) {
    return next(createError(400, 'Input validation error', { expose: false, contents: result.array() }));
  }
  return next();
};

module.exports = { reportError };