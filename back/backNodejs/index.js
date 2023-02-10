require("./connection");
const express = require("express");
const Book = require("./models/Book");
const User = require("./models/User");

const app = express();

app.use(express.json());

app.post("/donateBook", async (req, res) => {
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
});

app.get("/getUser", async (req, res) => {
  try {
    const id = req.body.id;
    const userFound = await User.FindOne({ _id: id });
    res.send({
      done: true,
      message: userFound,
    });
  } catch (error) {
    console.log(error);
    res.send({
      done: false,
      message: error,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
