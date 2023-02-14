const Book = require("../models/Book");
const User = require("../models/Book");

const saveBook = async (data) => {
  return await data.save();
};
const searchBookByTitle = async (title) => {
  const regex = new RegExp(title, 'i');
  return await Book.find({title: regex})
}
module.exports = {
    saveBook,
    searchBookByTitle
};
