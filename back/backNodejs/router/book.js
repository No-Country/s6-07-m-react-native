const { Router } = require("express");
const { validationDonateBook, validationEraseBook } = require('../middleware/bookValidations')
const { donateBook, eraseBook } = require("../controller/Book.controller");

const router = Router();

router.post("/donateBook",validationDonateBook, donateBook);
router.delete("/deleteBook", validationEraseBook, eraseBook);

module.exports = router;
