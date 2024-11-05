const express = require('express');
const sentimentController = require('../controllers/sentimentControllers');

const router = express.Router();

/**
 * @swagger
 * /analyze:
 *   post:
 *     summary: Analyze a product review and determine sentiment
 *     description: Returns the sentiment (positive, negative, neutral) and an intensity score.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewText:
 *                 type: string
 *                 description: Review text
 *     responses:
 *       200:
 *         description: Result of the sentiment analysis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sentimentLabel:
 *                   type: string
 *                   example: positive
 *                 sentimentScore:
 *                   type: number
 *                   example: 0.85
 */
router.post('/analyze', sentimentController.analyze);

/**
 * @swagger
 * /results:
 *   get:
 *     summary: Get accumulated sentiment analysis
 *     description: Returns statistics of positive, negative, and neutral reviews for all reviews in the database.
 *     responses:
 *       200:
 *         description: Sentiment statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 positive:
 *                   type: integer
 *                   description: Number of positive reviews
 *                 neutral:
 *                   type: integer
 *                   description: Number of neutral reviews
 *                 negative:
 *                   type: integer
 *                   description: Number of negative reviews
 *      
 */
router.get('/results', sentimentController.getResults);

/**
 * @swagger
 * /trends:
 *   get:
 *     summary: Get sentiment trends over time
 *     description: Returns sentiment trends, allowing users to see the evolution of opinions over time.
 *     responses:
 *       200:
 *         description: Sentiment trend data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trends:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       positive:
 *                         type: number
 *                       neutral:
 *                         type: number
 *                       negative:
 *                         type: number
 */
router.get('/trends', sentimentController.getTrends);

module.exports = router;



