const { Router } = require("express");
const { validationupdateuser } = require('../middleware/uservalidations')
const { getUser, updateUser } = require("../controller/User.controller");


const router = Router();
router.get("/getUser", getUser);
router.put("/updateUser", validationupdateuser ,updateUser);

module.exports = router;
