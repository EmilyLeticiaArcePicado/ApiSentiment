const Review = require('../models/review'); // Import the Review model

exports.getTrends = async () => {
    // Logic for calculating trends over time
    const trends = await Review.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } // Group by date
                },
                positive: {
                    $sum: { $cond: [{ $eq: ["$sentimentLabel", "positive"] }, 1, 0] }
                },
                neutral: {
                    $sum: { $cond: [{ $eq: ["$sentimentLabel", "neutral"] }, 1, 0] }
                },
                negative: {
                    $sum: { $cond: [{ $eq: ["$sentimentLabel", "negative"] }, 1, 0] }
                }
            }
        },
        {
            $sort: { _id: 1 } // Sort by date ascending
        }
    ]);

    // Format the trends for the response
    const formattedTrends = trends.map(trend => ({
        date: trend._id,
        positive: trend.positive,
        neutral: trend.neutral,
        negative: trend.negative
    }));

    return formattedTrends; // Return the formatted trends
};