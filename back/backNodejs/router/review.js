const { Router } = require("express");
const { createReview, getReview } = require("../controller/Review.controller");
const {
  validationcreatereview,
  validationgetreview,
} = require("../middleware/reviewValidation");

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         donatorId:
 *           type: string
 *           description: id of the donator
 *         applicantId:
 *           type: string
 *           description: id of the applicant
 *         stars:
 *           type: number
 *           description: ammount of stars
 *         message:
 *           type: string
 *           description: review message
 *         likes:
 *           type: number
 *           description: ammount of likes
 *       example:
 *         donatorId: "2456sd3fg5s2d15sd33"
 *         applicantId: "78sds1sd23df64sd2sd"
 *         stars: 4.2
 *         message: "I liked how nice he was and I recommend him"
 *     NotFound:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: status of the peticion
 *         statusMsg:
 *           type: string
 *           description: status of the message
 *         error:
 *           type: string
 *           description: message of error
 *       example:
 *         status: "404"
 *         statusMsg: "Not Found"
 *         error: "Not Found User ID"
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: status of the peticion
 *         statusMsg:
 *           type: string
 *           description: status of the message
 *         error:
 *           type: string
 *           description: message of error
 *       example:
 *         status: "404"
 *         statusMsg: "Not Found"
 *         error: "Not Found Donation"
 */

/**
 * @swagger
 * /review/createReview:
 *   post:
 *     summary: create a new review
 *     description: create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Error
 */
 
router.post("/createReview", validationcreatereview,createReview);

/**
 * @swagger
 * /review/getReview:
 *   get:
 *     summary: Get reviews from user
 *     description: Get all reviews from user
 *     tags: [Reviews]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             userId:
 *                 type: string
 *                 description: User ID
 *           example:
 *             userId: "sds3454sd24df456"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Error
 */

router.get("/getReview", validationgetreview, getReview);

module.exports = router;
