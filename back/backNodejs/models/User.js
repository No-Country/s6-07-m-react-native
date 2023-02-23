const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    profileImage: {
      type: String,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
      },
      number: {
        type: Number,
      },
      city: {
        type: String,
      },
      postalcode: {
        type: Number,
      },
      geolocation: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
