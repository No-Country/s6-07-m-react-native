const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
  {
    reviews: [
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
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", ReviewSchema);
