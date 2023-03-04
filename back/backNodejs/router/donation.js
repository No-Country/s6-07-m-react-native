const { Router } = require("express");
const {
  createDonation,
  findAllDonations,
  findDonationsId,
  findAllApplication,
} = require("../controller/Donation.controller");
const {
  validationCreateDonation,
  validationFindDonationId,
  validationFindAllDonations,
  validationFindAllApplication,
} = require("../middleware/DonationValidations");

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Donation:
 *       type: object
 *       properties:
 *         donatorId:
 *           type: string
 *           description: id of the donator
 *         applicantId:
 *           type: string
 *           description: id of the applicant 
 *         bookId:
 *           type: string
 *           description: id of the book
 *         chatId:
 *           type: string
 *           description: id of the chat
 *       example:
 *         donatorId: "sd32s15sdf321fd5a"
 *         applicantId: "sad54sa3as213a5d1"
 *         bookId: "sa45sa63341sd23sd"
 *         chatId: "d6f5h48yuk5g321ko"
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
 *         error: "Not Found Donation"
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
 * /donation/donate:
 *   post:
 *     summary: create a new donation
 *     description: create a new donation
 *     tags: [Donations]
 *     requestBody: 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Donation'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donation'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Error
 */
router.post("/donate", validationCreateDonation, createDonation);
/**
 * @swagger
 * /donation/alldonation/{userId}:
 *   get:
 *     sumary: return all donations of one user
 *     description: return all donations of  one user by userId
 *     tags: [Donations]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: the userId of the donation
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Donation'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Error
 */
router.get(
  "/alldonation/:userId",
  validationFindAllDonations,
  findAllDonations
);
/**
 * @swagger
 * /donation/allapplication/{userId}:
 *   get:
 *     sumary: return all application of one user
 *     description: return all donations of  one user by userId
 *     tags: [Donations]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: the userId of the donation
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Donation'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Error
 */
router.get("/allapplication/:userId",validationFindAllApplication, findAllApplication )
/**
 * @swagger
 * /donation/finddonation/{id}:
 *   get:
 *     description: return information about the donation for id
 *     sumary: return donation for id
 *     tags: [Donations]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of the donation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donation'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal Error
 */
router.get("/finddonation/:id", validationFindDonationId, findDonationsId);

module.exports = router;
