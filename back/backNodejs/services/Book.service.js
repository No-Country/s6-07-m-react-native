const { deleteOne } = require("../models/Book");
const Book = require("../models/Book");

const saveBook = async (data) => {
  const newBook = new Book({
    image: data.image,
    title: data.title,
    description: data.description,
    userId: data.id,
  });
  return await newBook.save();
};

const deleteBook = async (id) => {
  const book = await Book.findById(id);
  await Book.deleteOne({ _id: id });
  return book;
};

module.exports = {
  saveBook,
  deleteBook,
};
