const { body, param } = require("express-validator");
const { reportError } = require("./reportErrorValidation");

exports.validationCreateDonation = [
  body("donatorId").isMongoId().withMessage("Invalid donator ID"),
  body("applicantId").isMongoId().withMessage("Invalid applicant ID"),
  body("bookId").isMongoId().withMessage("Invalid book ID"),
  reportError,
];
exports.validationFindDonationId = [
  param("id").isMongoId().withMessage("Invalid donation ID"),
  reportError,
];
exports.validationFindAllDonations = [
  param("userId").isMongoId().withMessage("Invalid userId"),
  reportError,
];
