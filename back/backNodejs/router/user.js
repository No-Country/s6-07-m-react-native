const { Router } = require("express");
const { getUser } = require("../controller/User.controller");
const { updateUser } = require("../controller/UserUpdate.controller");
const { validationupdateuser } = require('../middleware/uservalidations')

const router = Router();
router.get("/getUser", getUser);
router.put("/updateUser", validationupdateuser ,updateUser);

module.exports = router;
