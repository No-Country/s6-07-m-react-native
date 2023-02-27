const Book = require("../models/Book");
const User = require("../models/Book");
const Review = require("../models/Review");
const Chat = require("../models/Chat");

const changeChatStatus = async (id) => {
  const chat = await Chat.findById(id);
  chat.finished = true;
  return await chat.save();
};

module.exports = {
  changeChatStatus,
};
