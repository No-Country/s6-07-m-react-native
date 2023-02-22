const { body, param } = require("express-validator");
const { reportError } = require("./reportErrorValidation");

exports.validationCreateDonation = [
  body("donatorId").notEmpty().withMessage("Id of Donator is required"),
  body("applicantId").notEmpty().withMessage("Id of Applicant is required"),
  body("bookId").notEmpty().withMessage("Id of Book is required"),
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
