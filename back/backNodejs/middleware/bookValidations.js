const {
  body,
  validationResult,
  ValidationError,
  param,
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
  body("userId").isMongoId().withMessage("Invalid user ID"),
  body("author").notEmpty().withMessage("You must specify an Author"),
  body("editorial")
    .notEmpty()
    .withMessage("You must specify the editorial of the book"),
  reportError,
];

exports.validationEraseBook = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  reportError,
];

exports.validationUpdateBook = [
  body("id").isMongoId().withMessage("Invalid book ID"),

  body("image").optional().notEmpty().withMessage("Image is required"),
  body("title")
    .optional()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Title must have more than 5 characters"),
  body("description")
    .optional()
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must have more than 10 characters")
    .isLength({ max: 200 })
    .withMessage("Description must have less than 200 characters"),
  reportError,
];

exports.validationGetDetailBook = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  reportError,
];
