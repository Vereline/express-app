import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: { type: mongoose.Schema.Types.String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  createdAt: { type: mongoose.Schema.Types.Date, required: true, default: new Date(Date.now()) },
  updatedAt: { type: mongoose.Schema.Types.Date, required: true, default: new Date(Date.now()) },
  //   deletedAt: mongoose.Schema.Types.Date, // right now deletion will be real removing item from the database
});


module.exports = mongoose.model('Comment', commentSchema);
