const Book = require("../models/Book");
const User = require("../models/Book");
const Review = require("../models/Review");

const saveReview = async (data) => {
  const newReview = new Review({
    donatorId: data.donatorId,
    applicantId: data.applicantId,
    stars: data.stars,
    message: data.message,
  });
  return await newReview.save();
};

const findReviews = async (data) => {
  return await Review.find({ donatorId: data.userId });
};

module.exports = {
  saveReview,
  findReviews,
};
