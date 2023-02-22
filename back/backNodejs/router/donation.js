const { Router } = require("express");
const {
  createDonation,
  findAllDonations,
  findDonationsId,
} = require("../controller/Donation.controller");
const {
  validationCreateDonation,
  validationFindDonationId,
  validationFindAllDonations,
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
 *       example:
 *         donatorId: ""
 *         applicantId: ""
 *         bookId: ""
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
 *       500:
 *         description: Internal Error
 */
router.get(
  "/alldonation/:userId",
  validationFindAllDonations,
  findAllDonations
);
router.get("/finddonation/:id", validationFindDonationId, findDonationsId);

module.exports = router;
