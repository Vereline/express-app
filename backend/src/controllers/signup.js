import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            isAdmin: req.body.isAdmin,
          });
          createdUser
            .save()
            .then((result) => {
              console.log(result);
              const token = jwt.sign(
                {
                  email: result.email,
                  userId: result._id,
                },
                config.JWT_KEY,
                {
                  expiresIn: '1h',
                },
              );
              res.status(201).json({
                message: 'User was successfully created',
                token,
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
