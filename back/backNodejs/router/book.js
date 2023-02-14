const { Router } = require("express");
const { donateBook } = require("../controller/Book.controller");

const router = Router();

router.get("/donateBook", donateBook);
module.exports = router;
