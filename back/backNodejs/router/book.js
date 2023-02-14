const { Router } = require("express");
const { donateBook } = require("../controller/Book.controller");

const router = Router();

router.post("/donateBook", donateBook);
module.exports = router;
