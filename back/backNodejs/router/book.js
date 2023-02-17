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
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del libro
 *         image:
 *           type: string
 *           description: URL de la imagen del libro
 *         title:
 *           type: string
 *           description: Título del libro
 *         description:
 *           type: string
 *           description: Descripción del libro
 *         userId:
 *           type: string
 *           description: ID del usuario que tiene el libro
 *         author:
 *           type: string
 *           description: Autor del libro
 *         editorial:
 *           type: string
 *           description: Editorial del libro
 *       example:
 *         image: "https://lamenteesmaravillosa.com/wp-content/uploads/2015/02/shutterstock_166743392.jpg"
 *         title: "Cien años de soledad"
 *         description: "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez."
 *         userId: "613d7c2e8c8c7f81f49d7542"
 *         author: "Gabriel García Márquez"
 *         editorial: "Sudamericana"
 */
router.post("/donateBook", validationDonateBook, donateBook);
/**
 * @swagger
 * /book/search:
 *   get:
 *     summary: Returns the list of the books search
 *     tags: [Books]
 *     parameters:
 *       - name: title
 *         in: query
 *         description: The title of the book
 *         required: false
 *         schema:
 *           type: string
 *       - name: editorial
 *         in: query
 *         description: The editorial of the book
 *         required: false
 *         schema:
 *           type: string
 *       - name: author
 *         in: query
 *         description: The author of the book
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: The page of the search
 *         required: false
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: The limit of the search
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/search", searchBook);
router.get("/detailBook", validationGetDetailBook, getDetailBook);
router.delete("/deleteBook", validationEraseBook, eraseBook);
router.put("/updateBook", validationUpdateBook, updateBook);

module.exports = router;
