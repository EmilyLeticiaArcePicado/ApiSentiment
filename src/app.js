const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');
const swaggerUI = require('swagger-ui-express');
const swaggerSpecs = require('./config/swaggerConfig'); // Import Swagger configuration
const { connectToDatabase } = require('./config/database'); // Import the connection function

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// API Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Main function to start the server
const startServer = async () => {
    try {
        // Connect to the database
        await connectToDatabase();
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Documentation available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

// Start the server
startServer();

module.exports = app;

