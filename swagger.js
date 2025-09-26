const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Salon de belleza BeautySaly',
        description: 'Documentación de la API para la gestión del salon de belleza',
    },
    host: 'localhost:8081',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // Cambia este archivo según el punto de entrada de tu API

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index'); // Inicia el servidor automáticamente
});