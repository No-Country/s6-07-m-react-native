const { Schema, model } = require("mongoose");

const DonationSchema = new Schema(
      {
        donatorId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        applicantId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        bookId: {
          type: Schema.Types.ObjectId,
          ref: "Book",
        },
      },
  {
    timestamps: true,
  }
);

module.exports = model("Donation", DonationSchema);
