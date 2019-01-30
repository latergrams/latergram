const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  post: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Comment', commentSchema);
