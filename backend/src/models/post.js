import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: mongoose.Schema.Types.String,
  postText: mongoose.Schema.Types.String,
//   authorId: mongoose.Schema.Types.ObjectId,
  createdAt: mongoose.Schema.Types.Date,
  updatedAt: mongoose.Schema.Types.Date,
//   deletedAt: mongoose.Schema.Types.Date, // right now deletion will be real removing item from the database
});


module.exports = mongoose.model('Post', postSchema);
