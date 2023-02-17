const Book = require("../models/Book");
const User = require("../models/User");
const { findUser, saveUser } = require("../services/User.service");
const {
  saveBook,
  searchBookByTitle,
  deleteBook,
  searchBookBy,
  bookUpdate,
  searchBookById,
} = require("../services/Book.service");
const { NotFound, Ok, Error } = require("../util/HttpResponse");
const { getPaginationUrls } = require("../util/Paginate");

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
  const { title, editorial, author, page, limit = 10 } = req.query;
  const currentPage = Number(page) || 1; // Si no se especifica la página, se asume la página 1
  try {
    let bookFound = [];
    let totalBooks = 0;
    if (title) {
      ({ books: bookFound, totalBooks } = await searchBookBy(
        title,
        "title",
        currentPage,
        limit
      ));
    } else if (author) {
      ({ books: bookFound, totalBooks } = await searchBookBy(
        author,
        "author",
        currentPage,
        limit
      ));
    } else if (editorial) {
      ({ books: bookFound, totalBooks } = await searchBookBy(
        editorial,
        "editorial",
        currentPage,
        limit
      ));
    }
    if (bookFound.length === 0) {
      return NotFound(res, "Book not found");
    }
    console.log(totalBooks, "Total books");
    const totalPages = Math.ceil(totalBooks / limit); // Número total de páginas

    const paginationUrls = getPaginationUrls(req, currentPage, totalPages);
    return Ok(res, {
      books: bookFound,
      pagination: {
        currentPage,
        totalPages,
        ...paginationUrls,
      },
    });
  } catch (error) {
    console.log(error);
    return Error(res, error);
  }
};

const updateBook = async (req, res) => {
  const body = req.body;
  try {
    const bookFound = await searchBookById(body._id);
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
const getDetailBook = async (req, res) => {
  const { id } = req.body;
  try {
    const bookFound = await searchBookById(id);
    if (!bookFound) {
      return NotFound(res, "Book not found");
    }
    return Ok(res, bookFound);
  } catch (error) {
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
  getDetailBook,
};
