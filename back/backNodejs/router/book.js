const { Router } = require("express");
const {
  validationDonateBook,
  validationEraseBook,
  validationUpdateBook,
  validationGetDetailBook,
} = require("../middleware/bookValidations");
const {
  donateBook,
  searchBook,
  eraseBook,
  updateBook,
  getDetailBook,
} = require("../controller/Book.controller");

const router = Router();

router.post("/donateBook", validationDonateBook, donateBook);
router.get("/search", searchBook);
router.get("/detailBook", validationGetDetailBook, getDetailBook);
router.delete("/deleteBook", validationEraseBook, eraseBook);
router.put("/updateBook", validationUpdateBook, updateBook);

module.exports = router;
