const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      default:
        "https://lamenteesmaravillosa.com/wp-content/uploads/2015/02/shutterstock_166743392.jpg",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    editorial: {
      type: String,
      required: true,
    },
    bookStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Book", BookSchema);
