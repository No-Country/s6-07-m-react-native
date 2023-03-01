const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API GiveAway',
      version: '1.0.0',
      description: 'Endpoints para la creacion y busqueda de los distintos datos'
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