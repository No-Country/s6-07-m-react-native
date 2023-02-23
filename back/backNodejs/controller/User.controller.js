const User = require("../models/User");
const { findUser, saveUser } = require("../services/User.service");
const { NotFound, Ok, Error } = require("../util/HttpResponse");

// Buscar Usuario por ID
const getUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await findUser(req.params.id);
    console.log(data, "data");
    if (!data) {
      return NotFound(res, "Not Found User");
    }
    return Ok(res, data);
  } catch (error) {
    return Error(res, error.message);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const userFound = await findUser(req.body.userId);
    if (!userFound) {
      return NotFound(res, "User not found");
    }
    if (req.body.email && req.body.email.length !== 0) {
      userFound.email = req.body.email;
    }
    if (req.body.username && req.body.username.length !== 0) {
      userFound.username = req.body.username;
    }
    if (req.body.profileImage && req.body.profileImage.length !== 0) {
      userFound.profileImage = req.body.profileImage;
    }
    const savedUser = await saveUser(userFound);
    return Ok(res, savedUser);
  } catch (error) {
    console.log(error);
    return Error(res, error.message);
  }
};

module.exports = { getUser, updateUser };
