import mongoose from 'mongoose';
import Post from '../models/post';
import User from '../models/user';


async function getUser(userId) {
  const user = await User.findById(userId);
  return user;
}

export default {
  postsList(req, res, next) {
    Post.find()
      .populate('author')
      .select('-__v') // everything except __v
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
      .populate('author')
      .select('-__v') // everything except __v
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

    const author = getUser(req.body.author);

    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      // createdAt: new Date(Date.now()),
      // updatedAt: new Date(Date.now()),
      title: req.body.title,
      postText: req.body.postText,
      image: `http://localhost:3005/${image}`,
      author: req.body.author,
    });
    // post.save().exec();
    author.posts.push(post);
    author.save();
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

    if (req.file) {
      updateData.image = `http://localhost:3005/${req.file.path}`;
    }

    Post.findByIdAndUpdate(postId, {
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
