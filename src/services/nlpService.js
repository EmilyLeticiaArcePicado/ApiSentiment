const Sentiment = require('sentiment'); // Import the sentiment analysis library

exports.analyzeWithNLP = async (text) => {
    const sentiment = new Sentiment(); // Create an instance of the analyzer
    const result = sentiment.analyze(text); // Analyze the text and return the result

    // Build the result object that we want to return
    const sentimentAnalysisResult = {
        label: result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral', // Label based on the score
        score: result.score, // Total score of the analysis
    };

    return sentimentAnalysisResult; // Return the result
};






