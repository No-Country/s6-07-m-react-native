const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
});

module.exports = model("Message", MessageSchema);
