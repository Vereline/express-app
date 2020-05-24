import config from './index';

// https://swagger.io/specification/
const swaggerDefinition = {
  info: {
    title: 'backend',
    version: '0.0.1',
    description: 'Swagger for the backend',
  },
  host: `${config.API_URL}:${config.API_PORT}`,
  basePath: '/',
  schemes: ['http', 'https'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Authorization with JWT token',
    },
    // bearerAuth: {
    //   type: 'http', // this library is using old OpenAPI 2 specification
    //   scheme: 'bearer',
    //   bearerFormat: 'JWT',
    // },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export default swaggerOptions;
