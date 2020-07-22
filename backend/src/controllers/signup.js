import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user';

export default {
  signupUser(req, res, next) {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          res.status(409).json({
            message: 'This email already exists',
          });
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          }
          const createdUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
          });
          createdUser
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: 'User was successfully created',
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                error: err,
              });
            });
        });
      });
  },
};
