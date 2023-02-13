const User = require("../models/User");
const { findUser } = require("../services/User.service");
const { NotFound, Ok, Error } = require("../util/HttpResponse");

const getUser = async (req, res) => {
  try {
    const id = req.body.id;
    const data = await findUser(id)
    console.log(data, "data")
    if(!data){
      return NotFound(res, "Not Found User")
    }
    return Ok(res, data)
  } catch (error) {
    console.log(error)
    if(error.kind =='ObjectId'){
      return NotFound(res, "Id is invalid")
    }
    return Error(res, error.message)
  }
};

module.exports = { getUser };
