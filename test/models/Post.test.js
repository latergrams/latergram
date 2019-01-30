require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Post = require('../../lib/models/Post');
const User = require('../../lib/models/User');

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
          user: createdUser._id.toString(),
          photoUrl: 'pictures.com', 
          caption: 'fyrefest'

        })
          .then(post => expect(post.toJSON()).toEqual({
            user: expect.any(Object),
            photoUrl: 'pictures.com', 
            caption: 'fyrefest',
            tags: [],
            _id: expect.any(Object)
          }));
      });
  });

});
