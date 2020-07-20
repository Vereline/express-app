import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morganBody from 'morgan-body';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import fs from 'fs';

import config from './config';
import routes from './routes';
import { adminRouter, adminBro } from './routes/adminBro';
import apollo from './graphql';
import swaggerOptions from './config/swagger';

const app = express();
app.server = http.createServer(app);

// Connect app to the database
mongoose.connect(
  config.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// middleware
app.use(cors());

// admin route
app.use(adminBro.options.rootPath, adminRouter);

// File upload endpoint
app.use('/uploads', express.static('uploads'));

// Check if folder does not exist and crete new one
const uploadsFolder = './uploads';

if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder);
}

// swagger Documentation
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const swaggerUiHandler = swaggerUi.setup(swaggerSpec);
const docsJsonPath = '/api-docs.json';

app.get(docsJsonPath, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUi.serve, (req, res, next) => {
  if (!req.query.url) {
    res.redirect(`/docs?url=${req.protocol}://${req.headers.host}${docsJsonPath}`);
  } else {
    swaggerUiHandler(req, res, next);
  }
});

// use bodyParser to parse all json object passed to the app
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// hook morganBody to express app
if (process.env.NODE_ENV === 'development') {
  morganBody(app);
}

// api routes to /api
app.use('/api', routes);

// Append apollo to our API
apollo(app);

// Middleware, that handles 404 error if endpoint or id was not found
// All these handlers should be at the bottom of the file(otherwise all other middleware won't be available)
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Middleware, that handles 500 error in case an internall error occured
app.use((error, req, res, next) => {
  const errorCode = error.status || 500;
  res.status(errorCode);
  res.json({
    error: {
      message: error.message,
      code: errorCode,
    },
  });
});

app.server.listen(config.port);

console.log(`Started on 'http://localhost:${app.server.address().port}'`);

export default app;
