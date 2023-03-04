const Book = require("../models/Book");
const User = require("../models/Book");

const saveBook = async (data) => {
  const newBook = new Book({
    image: data.image,
    title: data.title,
    description: data.description,
    userId: data.userId,
    author: data.author,
    editorial: data.editorial,
  });
  return await newBook.save();
};

const deleteBook = async (id) => {
  const book = await Book.findById(id);
  await Book.deleteOne({ _id: id });
  return book;
};

const searchBookBy = async (query, type, page, limit) => {
  const regex = new RegExp(query, "i");
  let searchFields;

  switch (type) {
    case "all":
      searchFields = {};
      break;
    case "title":
      searchFields = { title: regex };
      break;
    case "author":
      searchFields = { author: regex };
      break;
    case "editorial":
      searchFields = { editorial: regex };
      break;
    default:
      throw new Error("Invalid search type");
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  console.log(searchFields);
  const totalBooks = await Book.countDocuments(searchFields);
  const search = await Book.find(searchFields)
    .skip(startIndex)
    .limit(limit)
    .exec();
  console.log(search, "search");
  return { books: search, totalBooks };
};

const bookUpdate = async (data, id) => {
  return await Book.updateOne({ _id: id }, { $set: data });
};
const searchBookById = async (id) => {
  return await Book.findById(id);
};
module.exports = {
  saveBook,
  searchBookBy,
  deleteBook,
  bookUpdate,
  searchBookById,
};
