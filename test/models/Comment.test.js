require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Post = require('../../lib/models/Post');
const User = require('../../lib/models/User');
const CommentModel = require('../../lib/models/Comment')

describe('models', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(() => mongoose.disconnect());

  it('validates a good model', () => {
    return User.create({
      username: 'test',
      password: '234',
      photoUrl: 'http://www.monkey.com'
    })
      .then(createdUser => {
        return Post.create({
          user: createdUser._id,
          photoUrl: 'pictures.com', 
          caption: 'fyrefest'

        })
          .then(createdPost => {
            return CommentModel.create({
              commentBy: createdUser._id,
              post: createdPost._id,
              comment: 'Yo ugly!'
            })
              .then(comment => expect(comment.toJSON()).toEqual({
                commentBy: expect.any(mongoose.Types.ObjectId),
                post: expect.any(mongoose.Types.ObjectId),
                comment: 'Yo ugly!',
                _id: expect.any(mongoose.Types.ObjectId)
              }));
          });
      });
  });

});
