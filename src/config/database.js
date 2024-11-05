
const mongoose = require('mongoose');

// Connect to MongoDB
exports.connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Propagate the error for handling in the application
    }
};


