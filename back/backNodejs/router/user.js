const { Router } = require("express");
const { validationUpdateUser } = require("../middleware/uservalidations");
const { getUser, updateUser } = require("../controller/User.controller");

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
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
 */
/**
 * @swagger 
 * /user/getUser/{id}:
 *   get:
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
 * /updateUser:
 *   put:
 *     summary: Actualiza un usuario
 *     description: Actualiza el correo electrónico y la imagen de perfil de un usuario existente.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       description: Datos del usuario a actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
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
