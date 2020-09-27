import mongoose from 'mongoose';
import Comment from '../models/comment';
import Post from '../models/post';

export default {
  commentsList(req, res, next) {
    Comment.find()
      .populate('author')
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
  commentsPostList(req, res, next) {
    Post.findById(req.params.postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: 'Post not found',
          });
        }
        return Comment.find({
          post: req.params.postId,
        })
          .populate('author')
          .select('-__v');// everything except __v
      })
      .then((result) => {
        console.log(result);
        res.status(201).json({
          comments: result,
        });
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
      .populate('author')
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
    Post.findById(req.body.post)
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: 'Post not found',
          });
        }

        const comment = new Comment({
          _id: new mongoose.Types.ObjectId(),
          text: req.body.text,
          author: req.body.author,
          post: req.body.post,
        });
        post.comments.push(comment);
        return comment.save();
      })
      .then((result) => {
        console.log(result);
        res.status(201).json({
          comment: result,
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
        res.status(200).json({
          comment: result,
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
