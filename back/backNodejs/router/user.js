const { Router } = require("express");
const { getUser } = require("../controller/User.controller");
const { updateUser } = require("../controller/UserUpdate.controller");

const router = Router();
router.get("/getUser", getUser);
router.put("/updateUser", updateUser);

module.exports = router;
