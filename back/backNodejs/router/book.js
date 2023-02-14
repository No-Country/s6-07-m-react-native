const { Router } = require("express");
const { donateBook, searchBook } = require("../controller/Book.controller");

const router = Router();

router.post("/donateBook", donateBook);
router.get("/search/:title", searchBook)
module.exports = router;
