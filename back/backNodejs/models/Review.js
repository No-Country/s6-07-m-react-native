const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
  {
    donatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    stars: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", ReviewSchema);
