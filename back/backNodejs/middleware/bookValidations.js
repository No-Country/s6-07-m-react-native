const {
  body,
  validationResult,
  ValidationError,
} = require("express-validator");
const { reportError } = require("./reportErrorValidation");

exports.validationDonateBook = [
  body("image").notEmpty().withMessage("An image is required"),
  body("title")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Title must have more than 5 characters"),
  body("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must have more than 10 characters")
    .isLength({ max: 200 })
    .withMessage("Description must have less than 200 characters"),
  body("id").notEmpty().withMessage("Didn't give user ID"),
  reportError,
];

exports.validationEraseBook = [
    body("id").notEmpty().withMessage("Didn't give user ID"),
  reportError,
];
