const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ReviewSentimentAPI',
      version: '1.0.0',
      description: 'API to analyze sentiment of product reviews',
      contact: {
        name: 'Emily Arce',
        email: 'emilyleticiaarcepicado@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local development server'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to the files where endpoints are defined
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpecs;

