const { Router } = require("express");
const router = Router();

// ----- Importaciones de las rutas ------------
const userRouter = require("./user");
const bookRouter = require("./book");

// ------Router --------------------------------
router.use("/user", userRouter);
router.use("/book", bookRouter);

module.exports = router;
