const nlpService = require('../services/nlpService'); // Ensure the path is correct
const Review = require('../models/review'); // Import the Review model
const getResult = require('../services/getResults'); // Ensure the path is correct
const getTrend = require('../services/getTrends'); // Ensure the path is correct


// Controller to analyze and save a review
exports.analyze = async (req, res) => {
    const { reviewText } = req.body; // Extract the review text from the request body

    try {
        // Analyze the sentiment of the text
        const result = await nlpService.analyzeWithNLP(reviewText); // Ensure the function is defined correctly

        // Create a new review using the Review model
        const newReview = new Review({
            reviewText,
            sentimentScore: result.score, // Use the score from the analysis
            sentimentLabel: result.label, // Use the label from the analysis
        });

        // Save the new review in the database
        await newReview.save();

        // Respond to the client with the result of the analysis
        res.status(200).json({
            sentimentLabel: result.label,
            sentimentScore: result.score,
            message: "Review saved successfully",
        });
    } catch (error) {
        console.error(error); // Log for debugging
        res.status(500).json({
            message: "An error occurred on the server",
            error: error.message || "Unknown error",
        });
    }
};

// Controller to get aggregated sentiment results for a specific product
exports.getResults = async (req, res) => {
    const { productId } = req.params; // Extract productId from request parameters

    try {
        // Retrieve aggregated results by product using the sentimentService
        const stats = await getResult.getResults(productId);

        // Respond with the aggregated stats
        res.status(200).json(stats);
    } catch (error) {
        console.error(error); // Log for debugging
        res.status(500).json({ error: 'Error retrieving sentiment results for the product.' });
    }
};

// Controller to get sentiment trends over time
exports.getTrends = async (req, res) => {
    try {
        // Retrieve trends using the sentimentService
        const trends = await getTrend.getTrends();

        // Respond with the trends
        res.status(200).json({ trends });
    } catch (error) {
        console.error(error); // Log for debugging
        res.status(500).json({ error: 'Error retrieving sentiment trends.' });
    }
};