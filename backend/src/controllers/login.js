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
          res.status(401).json({
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
              },
              config.JWT_KEY,
              {
                expiresIn: '1h',
              },
            );
            res.status(200).json({
              message: 'Auth successful',
              token,
            });
          }
          res.status(401).json({
            message: 'Auth failed',
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
};
