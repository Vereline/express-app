import jwt from 'jsonwebtoken';
import config from '../config';

export default {
  checkAuth(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.JWT_KEY);
      req.userData = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        message: 'Token is invalid or expired',
      });
    }
  },
};
