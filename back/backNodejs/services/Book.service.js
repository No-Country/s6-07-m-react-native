const User = require("../models/Book");

const createBook = async (data) => {
  return await data.save();
};

module.exports = {
  createBook,
};
