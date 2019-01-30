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
    type: String
  },
  tags: {
    type: Array
  }
},
{
  toJSON:{
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});


module.exports = mongoose.model('Post', postSchema);
