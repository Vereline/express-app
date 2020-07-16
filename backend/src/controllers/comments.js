import mongoose from 'mongoose';
import Comment from '../models/comment';

export default {
  commentsList(req, res, next) {
    Comment.find()
      .select('-__v') // everything except __v
      .exec()
      .then((result) => {
        console.log(result);
        if (result && result.length >= 0) {
          res.status(200).json({
            comments: result,
            count: result.length,
          });
        } else {
          res.status(404).json({
            message: 'Comments are not found',
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
  commentsDetail(req, res, next) {
    const commentId = req.params.id;

    Comment.findById(commentId)
      .select('-__v') // everything except __v
      .exec()
      .then((result) => {
        console.log(result);
        if (result) {
          res.status(200).json({
            comment: result,
          });
        } else {
          res.status(404).json({
            message: 'Comment with specified id is not found',
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
  commentsCreate(req, res, next) {
    const comment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      author: req.body.author,
      post: req.body.post,
    });
    comment.save()
      .exec()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          post: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  commentsUpdate(req, res, next) {
    const commentId = req.params.id;
    const updateData = {
      updatedAt: new Date(Date.now()),
      ...req.body,
    };
    Comment.update({ _id: commentId }, {
      $set: {
        ...updateData,
      },
    })
      .exec()
      .then((result) => {
        res.status(204).json({
          post: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  commentsDelete(req, res, next) {
    const commentId = req.params.id;

    Comment.remove({ _id: commentId })
      .exec()
      .then((result) => {
        res.status(204).json({
          result,
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
