const { Router } = require("express");
const { getUser } = require("../controller/User.controller");

const router = Router();
router.get("/getUser", getUser);

module.exports = router;
