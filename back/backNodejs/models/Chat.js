const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
  finished: {
    type: Boolean,
    default: false,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = model("Chat", ChatSchema);
