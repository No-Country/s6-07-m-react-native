const User = require("../models/User");
const { findUser, saveUser } = require("../services/User.service");
const { NotFound, Ok, Error } = require("../util/HttpResponse");

// Buscar Usuario por ID
const getUser = async (req, res) => {
  try {
    console.log(req.params.id)
    const data = await findUser(req.params.id);
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
    if (!userFound) {
      return NotFound(res, "User not found");
    }
    userFound.email = req.body.email;
    userFound.profileImage = req.body.image;
    const savedUser = await saveUser(userFound);
    return Ok(res, savedUser);
  } catch (error) {
    console.log(error);
    return Error(res, error.message);
  }
};

module.exports = { getUser, updateUser };
