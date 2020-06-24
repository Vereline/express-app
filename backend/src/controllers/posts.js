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
    res.status(200).json({
      hello: 'world',
    });
  },
  postsUpdate(req, res, next) {
    const id = req.params.id;
    res.status(200).json({
      hello: id,
    });
  },
};
