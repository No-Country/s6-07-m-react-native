const {
  body,
  validationResult,
  ValidationError,
} = require("express-validator");
const { reportError } = require("./reportErrorValidation");

exports.validationcreatereview = [
  body("donatorId").isMongoId().withMessage("Invalid donator ID"),
  body("applicantId").isMongoId().withMessage("Invalid applicant ID"),
  body("stars").notEmpty().withMessage("Didn't rate user"),
  body("message").optional(),
  reportError,
];

exports.validationgetreview = [
    body("userId").isMongoId().withMessage("Invalid user ID"),
    reportError,
]
