const { body, validationResult, ValidationError } = require("express-validator");
const { reportError } = require("./reportErrorValidation");

exports.validationcreateuser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  reportError,
];

exports.validationUpdateUser = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("username").optional().notEmpty().withMessage("Username is required"),
  body("email").optional().isEmail().withMessage("Email is not valid"),
  reportError,
];

