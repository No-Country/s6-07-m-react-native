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
 *     BookNotId:
 *       type: object
 *       properties:
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
 *     BookUpdate:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: id of the book
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
 *         id: "63ee524fc81e46a1e293a4b7"
 *         image: "https://lamenteesmaravillosa.com/wp-content/uploads/2015/02/shutterstock_166743392.jpg"
 *         title: "Cien años de soledad"
 *         description: "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez."
 *         userId: "613d7c2e8c8c7f81f49d7542"
 *         author: "Gabriel García Márquez"
 *         editorial: "Sudamericana"
 */

 /**
 * @swagger
 * /book/donateBook:
 *   post:
 *     sumary: created a mew book for donation

 *     description: Create a mew book for donation

 *     tags: [Books]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookNotId'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Error
 */
router.post("/donateBook", validationDonateBook, donateBook);
/**
 * @swagger
 * /book/search:
 *   get:
 *     summary: Returns the list of the books search
 *     description: Returns the list of the books search
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
/**
 * @swagger
 * /book/detailBook/{id}:
 *   get:
 *     sumary: return details of the book for the id
 *     description: return details of the book of the book for the id
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Error Interno del servidor
 * 
 */
router.get("/detailBook/:id", validationGetDetailBook, getDetailBook);
/**
 * @swagger
 * /book/deleteBook/{id}:
 *   delete:
 *     sumary: delete book for id
 *     description: Delete book for id
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Not found
 *       500:
 *         description: Error Interno del servidor
 * 
 */
router.delete("/deleteBook/:id", validationEraseBook, eraseBook);
 /**
  * @swagger
  * /book/updateBook:
  *   put:

  *     sumary: update information about the book
  *     description: update information about the book
  *     tags: [Books]

  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/BookUpdate'
  *     responses:
  *       200: 
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Book'
  *       404:
  *         description: Not found
  *       500:
  *         description: Internal Error
  * 
  * 
  */
router.put("/updateBook", validationUpdateBook, updateBook);

module.exports = router;
