const User = require("../models/Book");

const saveBook = async (data) => {
  return await data.save();
};

module.exports = {
    saveBook,
};
