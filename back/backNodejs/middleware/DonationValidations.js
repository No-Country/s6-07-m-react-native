const { body, param } = require("express-validator");
const { reportError } = require("./reportErrorValidation");

exports.validationCreateDonation = [
  body("donatorId").notEmpty().withMessage("Id of Donator is required"),
  body("applicantId").notEmpty().withMessage("Id of Applicant is required"),
  body("bookId").notEmpty().withMessage("Id of Book is required"),
  reportError,
];
exports.validationFindDonationId = [
  param("id").notEmpty().withMessage("id of donation is required"),
  reportError,
];
exports.validationFindAllDonations = [
  param("userId").notEmpty().withMessage("userId of donation is required"),
  reportError,
];
