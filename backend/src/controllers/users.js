import mongoose from 'mongoose';
import User from '../models/user';

export default {
  deleteUser(req, res, next) {
    User.remove({ _id: req.params.userId })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'User was successfully deleted',
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  updateUser(req, res, next) {
    const userId = req.params.id;

    const updateData = {
      updatedAt: new Date(Date.now()),
      ...req.body,
    };

    if (req.file) {
      updateData.photo = `http://localhost:3005/${req.file.path}`;
    }

    User.update({ _id: userId }, {
      $set: {
        ...updateData,
      },
    })
      .exec()
      .then((result) => {
        res.status(200).json({
          user: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  getUserDetail(req, res, next) {
    const userId = req.params.id;

    User.findById(userId)
      .select('-__v') // everything except __v
      .exec()
      .then((result) => {
        if (result) {
          console.log(result);
          res.status(200).json({
            user: result,
          });
        } else {
          res.status(404).json({
            message: 'User with specified id is not found',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  getUserList(req, res, next) {
    User.find()
      .select('-__v') // everything except __v
      .exec()
      .then((result) => {
        console.log(result);
        if (result && result.length >= 0) {
          res.status(200).json({
            users: result,
            count: result.length,
          });
        } else {
          res.status(404).json({
            message: 'Users are not found',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
};
