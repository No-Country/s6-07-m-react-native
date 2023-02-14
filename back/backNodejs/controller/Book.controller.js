const Book = require("../models/Book");
const User = require("../models/User");
const { findUser, saveUser } = require("../services/User.service");
const { saveBook, searchBookByTitle, deleteBook } = require("../services/Book.service");
const { NotFound, Ok, Error } = require("../util/HttpResponse");

const donateBook = async (req, res) => {
  try {
    const userFound = await findUser(req.body.id);
    if (!userFound) {
      return NotFound(res, "User ID not found");
    }
    const savedBook = await saveBook(req.body);
    userFound.books = [...userFound.books, savedBook.id];
    await saveUser(userFound);
    return Ok(res, savedBook);
  } catch (error) {
    console.log(error);
    return Error(res, error.message);
  }
};

const eraseBook = async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.body.id);
    const userFound = await findUser(deletedBook.userId);
    userFound.books = userFound.books.filter(
      (book) => book.toString() !== req.body.id
    );
    await saveUser(userFound);
    return Ok(res, deletedBook);
  } catch (error) {
    console.log(error);
    return Error(res, error.message);
  }
};

const searchBook = async (req, res) => {
  const { title } = req.params;
  try {
    const bookFound = await searchBookByTitle(title);
    if (bookFound.length === 0) {
      return NotFound(res, "Book not found");
    }
    return Ok(res, bookFound);
  } catch (error) {
    console.log(error);
    return Error(res, error);
  }
};

module.exports = {
  donateBook,
  searchBook,
  eraseBook,
};
