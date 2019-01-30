const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  }
});


module.exports = mongoose.model('Post', postSchema);
