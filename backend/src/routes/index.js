import express from 'express';
// import middlewares from '../middlewares';
import demo from './demo';
import login from './login';
import signup from './signup';
import posts from './posts';
import comments from './comments';

const { Router } = express;
const api = Router();

// internal middleware
// api.use(middlewares());

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
api.use('/comments', comments);

export default api;
