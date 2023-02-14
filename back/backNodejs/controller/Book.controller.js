const Book = require("../models/Book");
const User = require("../models/User");
const { findUser } = require("../services/User.service");
const { saveBook } = require("../services/Book.service");
const { NotFound, Ok, Error } = require("../util/HttpResponse");

const donateBook = async (req, res) => {
  try {
    const userFound = await findUser(req.body.id);
    if (userFound) {
      if (req.body.title.length > 5 && req.body.title.length < 20) {
        if (
          req.body.description.length > 10 &&
          req.body.description.length < 200
        ) {
          const newBook = new Book({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            userId: req.body.id,
          });
          const savedBook = await saveBook(newBook);
          userFound.books = [...userFound.books, savedBook.id];
          return Ok(res, savedBook);
        } else {
          return Error(res, "Description too short or too long");
        }
      } else {
        return Error(res, "Title too short or too long");
      }
    } else {
      return NotFound(res, "User ID not found");
    }
  } catch (error) {
    console.log(error);
    return Error(res, error.message);
  }
};

module.exports = {
  donateBook,
};
