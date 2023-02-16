const { Router } = require("express");
const { validationDonateBook, validationEraseBook, validationUpdateBook } = require('../middleware/bookValidations')
const { donateBook, searchBook, eraseBook, updateBook} = require("../controller/Book.controller");

const router = Router();

router.post("/donateBook",validationDonateBook, donateBook);
router.get("/search/:title", searchBook)
router.delete("/deleteBook", validationEraseBook, eraseBook);
router.put("/updateBook", validationUpdateBook, updateBook)

module.exports = router;
