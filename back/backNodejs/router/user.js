const { Router } = require("express");
const {
  validationUpdateUser,
  validationDeleteUser,
  validationGetUser,
} = require("../middleware/uservalidations");
const {
  getUser,
  updateUser,
  deleteUsers,
} = require("../controller/User.controller");
const { deleteUser } = require("../services/User.service");

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     userUpdate:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID del usuario
 *         username:
 *           type: string
 *           description: Nuevo nombre de usuario (opcional)
 *         email:
 *           type: string
 *           format: email
 *           description: Nuevo correo electrónico del usuario (opcional)
 *         profileImage:
 *           type: string
 *           description: Nueva imagen de perfil (opcional)
 *       example:
 *         userId: "63ea5f5c5323eae501ef1650"
 *         usermane: "pepito"
 *         email: "pepito@hotmail.com"
 *         profileImage: "https://img.freepik.com/vector-gratis/ilustracion-pila-libros-diseno-plano-dibujado-mano_23-2149341898.jpg"
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario unico
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               description: Calle de la dirección del usuario
 *             number:
 *               type: integer
 *               description: Número de la dirección del usuario
 *             city:
 *               type: string
 *               description: Ciudad de la dirección del usuario
 *             postalcode:
 *               type: integer
 *               description: Código postal de la dirección del usuario
 *             geolocation:
 *               type: object
 *               properties:
 *                 latitude:
 *                   type: number
 *                   format: float
 *                   description: Latitud de la dirección del usuario
 *                 longitude:
 *                   type: number
 *                   format: float
 *                   description: Longitud de la dirección del usuario
 *         books:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *       example:
 *         name: "usuario de prueba"
 *         usermane: "pepito"
 *         email: "pepito@hotmail.com"
 *         password: "0123456"
 *     NotFoundResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 404
 *         statusMsg:
 *           type: string
 *           example: Not Found
 *         error:
 *           type: string
 *           example: User not found
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 500
 *         statusMsg:
 *           type: string
 *           example: Internal server error
 *         error:
 *           type: string
 *           example: Internal Error of the server
 *     ErrorInputResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 500
 *         message:
 *           type: string
 *           example: Internal server error
 *         errors:
 *           type: array
 *           items:
 *             type: string
 */
/**
 * @swagger
 * /user/getUser/{id}:
 *   get:
 *     summary: Get User By Id
 *     description: Returns a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The user Id
 *     responses:
 *       200:
 *         description: Return user search
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error Input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorInputResponse'
 *       404:
 *         description: No se encontró el usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/getUser/:id", validationGetUser, getUser);
/**
 * @swagger
 * /user/updateUser:
 *   put:
 *     summary: Actualiza un usuario
 *     description: Actualiza el correo electrónico y la imagen de perfil de un usuario existente.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userUpdate'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error Input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorInputResponse'
 *       404:
 *         description: No se encontró el usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/updateUser", validationUpdateUser, updateUser);
/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Delete User By Id
 *     description: Delete user for id of user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The user Id
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error Input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorInputResponse'
 *       404:
 *         description: No se encontró el usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/deleteUser/:id", validationDeleteUser, deleteUsers);

module.exports = router;
