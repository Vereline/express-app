import AdminBro from 'admin-bro';
import AdminBroExpressjs from 'admin-bro-expressjs';
import bcrypt from 'bcrypt';
import Post from '../models/post';
import Comment from '../models/comment';
import User from '../models/user';

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'));

const adminBro = new AdminBro({
  resources: [Post, Comment, User],
  rootPath: '/admin',
});

const adminRouter = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const checkHash = await bcrypt.compare(password, user.password);
      if (checkHash) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: 'session Key',
});

export {
  adminRouter,
  adminBro,
};
