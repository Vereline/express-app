import express from 'express';

const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')

const adminBro = new AdminBro({
  databases: [],
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
