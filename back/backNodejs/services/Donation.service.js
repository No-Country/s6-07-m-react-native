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
  }).populate({
    path: "bookId",
    model: "Book",
    select: "title author",
    populate: {
      path: "userId",
      model: "User",
      select: "username",
    },
  });;
};
const findDonationById = async (id) => {
    return await Donation.findById({_id: id}).populate({
      path: 'bookId',
      model: 'Book',
      select: 'title author',
      populate: {
        path: 'userId',
        model: 'User',
        select: 'username',
      },
    });;
}

module.exports = {
  savedDonation,
  findAllDonation,
  findDonationById

};
