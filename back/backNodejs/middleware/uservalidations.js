const { body, validationResult, ValidationError } = require("express-validator");
const createError = require("http-errors");
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

exports.validationcreateuser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  reportError,
];

exports.validationupdateuser = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("username").optional().notEmpty().withMessage("Username is required"),
  body("email").optional().isEmail().withMessage("Email is not valid"),
  reportError,
];

