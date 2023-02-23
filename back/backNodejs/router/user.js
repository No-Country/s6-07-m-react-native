const { Router } = require("express");
const { validationUpdateUser } = require("../middleware/uservalidations");
const { getUser, updateUser } = require("../controller/User.controller");

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
 */
/**
 * @swagger 
 * /user/getUser/{id}:
 *   get:
 *     tags: [Users]
 *     description: Returns a user by ID
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
 */
router.get("/getUser/:id", getUser);
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
 *       404:
 *         description: No se encontró el usuario
 *       500:
 *         description: Error interno del servidor
 */
router.put("/updateUser", validationUpdateUser, updateUser);

module.exports = router;
