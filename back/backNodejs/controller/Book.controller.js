const Book = require("../models/Book");

const donateBook = async (req, res) => {
  try {
    const newBook = new Book({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      userId: req.body.id,
    });
    await newBook.save();
    res.send({
      done: true,
      message: "Book added to data base",
    });
  } catch (error) {
    console.log(error);
    res.send({
      done: false,
      message: error,
    });
  }
};

module.exports = {
  donateBook,
};
