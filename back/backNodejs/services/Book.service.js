const Book = require("../models/Book");
const User = require("../models/Book");

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

const searchBookByTitle = async (title) => {
  const regex = new RegExp(title, "i");
  return await Book.find({ title: regex });
};

const bookUpdate = async (data, id)=> {
  return await Book.updateOne({ _id: id },{$set: data})
}
const searchBookById = async (id) => {
  return await Book.findById({ _id: id})
}
module.exports = {
  saveBook,
  searchBookByTitle,
  deleteBook,
  bookUpdate,
  searchBookById,
};
