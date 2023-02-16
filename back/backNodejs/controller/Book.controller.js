const Book = require("../models/Book");
const User = require("../models/User");
const { findUser, saveUser } = require("../services/User.service");
const {
  saveBook,
  searchBookByTitle,
  deleteBook,
  searchBookById,
  bookUpdate,
} = require("../services/Book.service");
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
    if (!deletedBook) {
      return NotFound(res, "Book not found");
    }
    const userFound = await findUser(deletedBook.userId);
    if (!userFound) {
      return NotFound(res, "User not found");
    }
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

const updateBook = async (req, res) => {
  const body = req.body;
  try {
    const bookFound = await searchBookById(body._id);
    console.log(bookFound, "found book")
    if (!bookFound) {
      return NotFound(res, "Book not found");
    }
    const updateBook = await bookUpdate(body, body._id);
    return Ok(res, "Successful update");
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return Error(res, "Id is invalids");
    }
    return Error(res, error.message);
  }
};
module.exports = {
  donateBook,
  searchBook,
  eraseBook,
  updateBook,
};
