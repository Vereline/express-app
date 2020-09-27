import jwt from 'jsonwebtoken';
import config from '../config';

export default {
  loginGithub(req, res, next) {
  },

  loginGithubCallback(req, res, next) {
    const token = jwt.sign(
      {
        email: req.user.email,
        userId: req.user._id,
        isAdmin: req.user.isAdmin,
      },
      config.JWT_KEY,
      {
        expiresIn: '1h',
      },
    );
    res.redirect(`http://localhost:4200/login?token=${token}`);
  },
};
