const User = require("../models/User");
const { findUser, saveUser } = require("../services/User.service");
const { NotFound, Ok, Error } = require("../util/HttpResponse");

// Buscar Usuario por ID
const getUser = async (req, res) => {
  try {
    const data = await findUser(req.body.id);
    console.log(data, "data");
    if (!data) {
      return NotFound(res, "Not Found User");
    }
    return Ok(res, data);
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return Error(res, "Id is invalid");
    }
    return Error(res, error.message);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const userFound = await findUser(req.body.id);
    if (userFound) {
      const emailRegex =
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(req.body.email)) {
        userFound.email = req.body.email;
        userFound.profileImage = req.body.image;
        const savedUser = await saveUser(userFound);
        return Ok(res, savedUser);
      } else {
        return Error(res, "Email has wrong format");
      }
    } else {
      return NotFound(res, "User not found");
    }
  } catch (error) {
    console.log(error);
    return Error(res, error.message);
  }
};

module.exports = { getUser, updateUser };
