const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewText: { type: String, required: true },
    sentimentScore: { type: Number, required: true },
    sentimentLabel: { 
        type: String, 
        enum: ['positive', 'negative', 'neutral'], // Cambia a español
        required: true 
    },

    
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('review', reviewSchema);
