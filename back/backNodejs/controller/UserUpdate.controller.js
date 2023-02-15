const User = require("../models/User");

const updateUser = async (req, res) => {
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
};

module.exports = { updateUser };
