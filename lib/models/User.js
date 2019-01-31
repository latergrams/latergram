const mongoose = require('mongoose');
const { hash } = require('../utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/token');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String
  },
  photoUrl: {
    type: String,
    required: true
  }
},
{
  toJSON:{
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.passwordHashed;
    }
  }
});

userSchema.virtual('password').set(function(password){
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword) 
    .then(hashedPassword => {
      this.passwordHashed = hashedPassword;
      next();
    }); 
});

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};




module.exports = mongoose.model('User', userSchema);
