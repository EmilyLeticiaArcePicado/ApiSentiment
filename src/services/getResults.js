const Review = require('../models/review'); // Import the Review model

exports.getResults = async (productId) => {
    // Retrieve reviews for the specified product
    const reviews = await Review.find({ productId });
    
    // Calculate statistics based on the retrieved reviews
    const positive = reviews.filter(r => r.sentimentLabel === 'positive').length;
    const neutral = reviews.filter(r => r.sentimentLabel === 'neutral').length;
    const negative = reviews.filter(r => r.sentimentLabel === 'negative').length;

    // Return the statistics object
    return { positive, neutral, negative };
};

