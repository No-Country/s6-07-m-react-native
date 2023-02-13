const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const id = req.body.id;
    const userFound = await User.findOne({ _id: id });
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
};

module.exports = { getUser };
