const User = require("../models/User");

const findUser = async (id) => {
  return await User.findById(id);
};
const saveUser = async (user) => {
  return await user.save();
};
module.exports = {
  findUser,
  saveUser,
};
