const mongoose = require("mongoose");
const { searchBookById } = require("../services/Book.service");
const {
  savedDonation,
  findAllDonation,
  findDonationById,
} = require("../services/Donation.service");
const { saveReview, findReviews } = require("../services/Review.service");
const { findUser } = require("../services/User.service");
const { NotFound, Ok } = require("../util/HttpResponse");

const createReview = async (req, res) => {
  const { body } = req;
  try {
    const donator = findUser(body.donatorId);
    if (!donator) {
      return NotFound(res, "Donator ID not found");
    }
    const applicant = findUser(body.applicantId);
    if (!applicant) {
      return NotFound(res, "Applicant ID not found");
    }
    const savedReview = await saveReview(body);
    return Ok(res, savedReview);
  } catch (error) {
    return Error(res, error.message);
  }
};

const getReview = async (req, res) => {
  const { body } = req;
  try {
    const userFound = findUser(body.userId);
    if (!userFound) {
      return NotFound(res, "User ID not found");
    }
    const userReviews = await findReviews(body);
    return Ok(res, userReviews);
  } catch (error) {
    return Error(res, error.message);
  }
};

module.exports = {
  createReview,
  getReview,
};
