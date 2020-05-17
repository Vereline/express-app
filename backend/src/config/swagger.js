import config from './index';

const swaggerDefinition = {
  info: {
    title: 'backend',
    version: '0.0.1',
    description: 'Swagger for the backend',
  },
  host: `${config.API_URL}:${config.API_PORT}`,
  basePath: '/',
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export default swaggerOptions;
