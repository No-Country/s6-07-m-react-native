const Donation = require("../models/Donation");
const savedDonation = async (data) => {
  const newDonation = new Donation({
    donatorId: data.donatorId,
    applicantId: data.applicantId,
    bookId: data.bookId,
  });
  return await newDonation.save();
};
const findAllDonation = async (userId) => {
  return await Donation.find({
    $or: [
      {
        donatorId: userId,
      },
      {
        applicantId: userId,
      },
    ],
  });
};
const findDonationById = async (id) => {
    return await Donation.findById({_id: id});
}

module.exports = {
  savedDonation,
  findAllDonation,
  findDonationById

};
