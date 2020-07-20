import mongoose from 'mongoose';
import Post from '../models/post';


export default {
  postsList(req, res, next) {
    Post.find()
      .select('-__v') // everything except __v
      // .populate('author')
      .exec()
      .then((result) => {
        console.log(result);
        if (result && result.length >= 0) {
          res.status(200).json({
            posts: result,
            count: result.length,
          });
        } else {
          res.status(404).json({
            message: 'Posts are not found',
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
  postsDetail(req, res, next) {
    const postId = req.params.id;

    Post.findById(postId)
      // .select('title postText updatedAt createdAt _id')
      .select('-__v') // everything except __v
      // .populate('author')
      .exec()
      .then((result) => {
        if (result) {
          console.log(result);

          res.status(200).json({
            post: result,
          });
        } else {
          res.status(404).json({
            message: 'Post with specified id is not found',
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
  postsCreate(req, res, next) {
    let image = null;
    if (req.file) {
      image = req.file.path;
    }

    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      // createdAt: new Date(Date.now()),
      // updatedAt: new Date(Date.now()),
      title: req.body.title,
      postText: req.body.postText,
      image,
      // author: req.body.authorId,
    });
    // post.save().exec();
    post.save()
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
  postsUpdate(req, res, next) {
    const postId = req.params.id;
    const updateData = {
      updatedAt: new Date(Date.now()),
      // author: req.body.authorId,
      ...req.body,
    };
    Post.update({ _id: postId }, {
      $set: {
        ...updateData,
      },
    })
      .exec()
      .then((result) => {
        res.status(200).json({
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
  postsDelete(req, res, next) {
    const postId = req.params.id;

    Post.remove({ _id: postId })
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
