import express from 'express';

import AdminBro from 'admin-bro';
import AdminBroExpressjs from 'admin-bro-expressjs';

import Post from '../models/post';
import Comment from '../models/comment';
import User from '../models/user';

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'));

const adminBro = new AdminBro({
  resources: [Post, Comment, User],
  rootPath: '/admin',
});

const router = express.Router();

router.use((req, res, next) => {
  if (req.session && req.session.admin) {
    req.session.adminUser = req.session.admin;
    next();
  } else {
    res.redirect(adminBro.options.loginPath);
  }
});

const adminRouter = AdminBroExpressjs.buildRouter(adminBro);

export {
  adminRouter,
  adminBro,
};
