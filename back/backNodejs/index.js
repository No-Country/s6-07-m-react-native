require("./connection");
const express = require("express");
const Book = require("./models/Book");
const User = require("./models/User");

const app = express();

app.use(express.json());

// Donar libro (Agregar el libro a la base de datos)
app.post("/donateBook", async (req, res) => {
  try {
    const userFound = await User.findById(req.body.id);
    if (userFound) {
      if (req.body.title.length > 5 && req.body.title.length < 20) {
        if (
          req.body.description.length > 5 &&
          req.body.description.length < 500
        ) {
          const newBook = new Book({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            userId: req.body.id,
          });
          const bookInserted = await newBook.save();
          console.log(bookInserted._id);
          userFound.books = [...userFound.books, bookInserted._id];
          await userFound.save();
          res.send({
            done: true,
            message: "Book added to data base",
          });
        } else {
          res.send({
            done: false,
            message: "Description too short or too long",
          });
        }
      } else {
        res.send({
          done: false,
          message: "Title too short or too long",
        });
      }
    } else {
      res.send({
        done: false,
        message: "Wrong user ID",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      done: false,
      message: error,
    });
  }
});

// Cargar Perfil
app.get("/getUser", async (req, res) => {
  try {
    const id = req.body.id;
    const userFound = await User.findById(id);
    userFound
      ? res.send({
          done: true,
          message: userFound,
        })
      : res.send({
          done: false,
          message: "User not found",
        });
  } catch (error) {
    console.log(error);
    res.send({
      done: false,
      message: error,
    });
  }
});

// Actualizar datos de perfil
app.put("/updateUser", async (req, res) => {
  try {
    const userFound = await User.findById(req.body.id);
    if (userFound) {
      const emailRegex =
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(req.body.email)) {
        userFound.email = req.body.email;
        userFound.profileImage = req.body.image;
        await userFound.save();
        res.send({
          done: true,
          message: "User updated",
        });
      } else {
        res.send({
          done: false,
          message: "Wrong email format",
        });
      }
    } else {
      res.send({
        done: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.send({
      done: false,
      message: error,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
