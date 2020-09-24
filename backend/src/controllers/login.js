import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default {
  loginUser(req, res, next) {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: 'Auth failed',
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
                isAdmin: user[0].isAdmin,
              },
              config.JWT_KEY,
              {
                expiresIn: '1h',
              },
            );
            return res.status(200).json({
              message: 'Auth successful',
              token,
            });
          }
          return res.status(401).json({
            message: 'Auth failed',
          });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          error: err,
        });
      });
  },

  verifyToken(req, res, next) {
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
      return res.status(200).json({
        message: 'Token is valid',
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Token is invalid or expired',
      });
    }
  },
};
