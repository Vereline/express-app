import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  title: { type: mongoose.Schema.Types.String, required: true },
  postText: { type: mongoose.Schema.Types.String, required: true },
  image: { type: mongoose.Schema.Types.String, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: mongoose.Schema.Types.Date, required: true, default: new Date(Date.now()) },
  updatedAt: { type: mongoose.Schema.Types.Date, required: true, default: new Date(Date.now()) },
  //   deletedAt: mongoose.Schema.Types.Date, // right now deletion will be real removing item from the database
});


module.exports = mongoose.model('Post', postSchema);
