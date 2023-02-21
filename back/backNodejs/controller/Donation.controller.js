const { searchBookById } = require("../services/Book.service");
const {
  savedDonation,
  findAllDonation,
  findDonationById,
} = require("../services/Donation.service");
const { findUser } = require("../services/User.service");
const { NotFound, Ok } = require("../util/HttpResponse");

const createDonation = async (req, res) => {
  const { body } = req;
  try {
    console.log(body, "body");
    const foundDonatorId = await findUser(body.donatorId);
    if (!foundDonatorId) {
      return NotFound(res, "Donator not found");
    }
    const foundApplicantId = await findUser(body.applicantId);
    if (!foundApplicantId) {
      return NotFound(res, "Applicant not found");
    }
    const foundBook = await searchBookById(body.bookId);
    if (!foundBook) {
      return NotFound(res, "Book not found");
    }
    const data = await savedDonation(body);
    return Ok(res, data);
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return Error(res, "Id is invalids");
    }
    return Error(res, error.message);
  }
};
const findAllDonations = async (req, res) => {
  const { userId } = req.params;
  try {
    const findDonation = await findAllDonation(userId);
    console.log(findDonation)
    console.log(findDonation.length, "foundDonation")
    if (!findDonation.length) {
      return NotFound(res, "Donation not founds");
    }
    return Ok(res, findDonation);
  } catch (error) {
    console.log(error);
    return Error(res, error.message);
  }
};
const findDonationsId = async (req, res) => {
  const { id } = req.params;
  try {
    const findDonation = await findDonationById(id);

    if (!findDonation) {
      return NotFound(res, "Not Found Donation");
    }
    return Ok(res, findDonation);
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return Error(res, "Id is invalids");
    }
    return Error(res, error.message);
  }
};
module.exports = {
  createDonation,
  findAllDonations,
  findDonationsId,
};
