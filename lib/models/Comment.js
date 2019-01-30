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
},
{
  toJSON:{
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});


module.exports = mongoose.model('Comment', commentSchema);
