import jwt from 'jsonwebtoken';
import config from '../config';

export default {
  checkAuth(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.JWT_KEY);
      req.userData = decoded;
      // decoded Data example
      // {
      //   email: 'string@string.com',
      //   userId: '5f230121713e4e04ab16f9d9',
      //   iat: 1596142241,
      //   exp: 1596145841
      // }
      return next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token is invalid or expired',
      });
    }
  },
};
