const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de ejemplo',
      version: '1.0.0',
      description: 'Descripción de la API de ejemplo'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./router/*.js'] // ruta al archivo principal de tu aplicación Node.js
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;