const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/models/User');

describe('app', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('has a /posts route', () => {
    return User.create({ username: 'username', password:  })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ username: 'username', password: 'password' })
          .then(res => res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        return request(app)
          .post('/posts')
          .send({ 
            user: res.body._id,
            photoUrl: 'www.whatever.yeah',
            caption: 'Nosebleeds are Amazing', 
            tags: ['boo', 'boo']
          })
          .then(post => {
            expect(post).toEqual({
              user: expect.any(mongoose.Types.ObjectId),
              photoUrl: 'www.whatever.yeah',
              caption: 'Nosebleeds are Amazing', 
              tags: ['boo', 'boo']
            })
          })

      });
  });
});
  

