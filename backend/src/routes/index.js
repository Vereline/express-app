import express from 'express';
// import middlewares from '../middlewares';
import demo from './demo';
import login from './login';
import signup from './signup';
import posts from './posts';

const { Router } = express;
const api = Router();

// internal middleware
// router.use(middlewares());

// '/api/'
api.get('/', (req, res) => {
  res.json({ hi: 'there' });
});

// '/api/_health'
api.get('/_health', (req, res) => {
  res.sendStatus(200);
});

// set routes here
api.use('/demo', demo);
api.use('/login/', login);
api.use('/signup/', signup);
api.use('/posts', posts);

export default api;
