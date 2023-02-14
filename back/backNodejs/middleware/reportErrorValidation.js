const { validationResult } = require("express-validator");
const createError = require("http-errors");
const { errorHandler } = require("./error.handler")

const reportError = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors, "errores");
  if (!errors.isEmpty()) {
    const error = createError(400, "Validation error", { expose: false, contents: errors.array() });
    next(error);
  } else {
    console.log(errors, "errores de next");
    next();
  }
};

module.exports = { reportError };