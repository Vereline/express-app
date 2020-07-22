import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: mongoose.Schema.Types.String, required: true },
  firstName: { type: mongoose.Schema.Types.String, required: true },
  lastName: { type: mongoose.Schema.Types.String, required: true },
  photo: { type: mongoose.Schema.Types.String, required: false },
  birthDate: { type: mongoose.Schema.Types.Date, required: true },
  isAdmin: { type: mongoose.Schema.Types.Boolean, required: true, default: false },
  createdAt: { type: mongoose.Schema.Types.Date, required: true, default: new Date(Date.now()) },
  updatedAt: { type: mongoose.Schema.Types.Date, required: true, default: new Date(Date.now()) },
  //   deletedAt: mongoose.Schema.Types.Date, // right now deletion will be real removing item from the database
});


module.exports = mongoose.model('User', userSchema);
