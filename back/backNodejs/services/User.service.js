const User = require("../models/User");

const findUser = async (id) => {
  return await User.findById(id);
};
const saveUser = async (user) => {
  return await user.save();
};
const deleteUser = async (id) => {
  return await User.findByIdAndDelete({_id: id})
}
module.exports = {
  findUser,
  saveUser,
  deleteUser
};
