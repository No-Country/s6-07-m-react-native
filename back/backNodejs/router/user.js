const { Router } = require("express");
const { getUser, updateUser } = require("../controller/User.controller");

const router = Router();
router.get("/getUser", getUser);
router.put("/updateUser", updateUser);

module.exports = router;
