export default {
  postsList(req, res, next) {
    res.status(200).json({
      hello: 'world',
    });
  },
  postsDetail(req, res, next) {
    const id = req.params.id;
    res.status(200).json({
      hello: id,
    });
  },
  postsCreate(req, res, next) {
    const newPost = {
      title: req.body.title,
      postText: req.body.title,
      authorId: req.body.authorId,
    };

    res.status(201).json({
      post: newPost,
    });
  },
  postsUpdate(req, res, next) {
    const id = req.params.id;

    const updatedPost = {
      title: req.body.title,
      postText: req.body.title,
      authorId: req.body.authorId,
      id,
    };

    res.status(200).json({
      post: updatedPost,
    });
  },
  postsDelete(req, res, next) {
    const id = req.params.id;
    res.status(200).json({
      hello: id,
    });
  },
};
