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
    .withMessage("Title must have more than 5 characters")
    .isLength({ max: 19 })
    .withMessage("Title must have less than 20 characters"),
  body("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must have more than 10 characters")
    .isLength({ max: 200 })
    .withMessage("Description must have less than 200 characters"),
  body("userId").notEmpty().withMessage("Didn't give user ID"),
  reportError,
];

exports.validationEraseBook = [
  param("id").notEmpty().withMessage("Didn't give user ID"),
  reportError,
];

exports.validationUpdateBook = [
  body("id").notEmpty().withMessage("Didn't give user ID"),
  body("image").optional().notEmpty().withMessage("Image is required"),
  body("title")
    .optional()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Title must have more than 5 characters")
    .isLength({ max: 19 })
    .withMessage("Title must have less than 20 characters"),
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
  param("id").notEmpty().withMessage("Didn't give user ID"),
  reportError,
]
