const { Router } = require("express");
const router = Router();

// ----- Importaciones de las rutas ------------
const userRouter = require("./user");
const bookRouter = require("./book");
const donationRouter = require("./donation");
const reviewRouter = require("./review");

// ------Router --------------------------------
router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/donation", donationRouter);
router.use("/review", reviewRouter);

module.exports = router;
