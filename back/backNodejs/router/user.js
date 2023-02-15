const { Router } = require("express");
const { validationUpdateUser } = require("../middleware/uservalidations");
const { getUser, updateUser } = require("../controller/User.controller");

const router = Router();

router.get("/getUser", getUser);
router.put("/updateUser", validationUpdateUser, updateUser);

module.exports = router;
