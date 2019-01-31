const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');

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
    return User.create({ username: 'username', password: 'password', photoUrl: 'whatever.com' })
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
            photoUrl: 'www.whatever.com',
            caption: 'Nosebleeds are Amazing', 
            tags: ['boo', 'boo']
          })
          .then(res => {
            expect(res.body).toEqual({
              user: expect.any(String),
              photoUrl: 'www.whatever.com',
              caption: 'Nosebleeds are Amazing', 
              tags: ['boo', 'boo'], 
              _id: expect.any(String)
            });
          });

      });
  });
  it('will get all posts', () => {
    return User.create({ username: 'username', password: 'password', photoUrl: 'whatever.com' })
      .then(user => {
        return Post
          .create({
            user: user._id,
            photoUrl: 'www.whatever.com',
            caption: 'Nosebleeds are Amazing', 
            tags: ['boo', 'boo']
          });
      })
      .then(() => {
        return request(app)
          .get('/posts')
          .then(res => expect(res.body).toHaveLength(1));
      });
  });
  it('gets posts by id', () => {
    return User.create({ username: 'username', password: 'password', photoUrl: 'whatever.com' })
      .then(user => {
        return Post
          .create({
            user: user._id,
            photoUrl: 'www.whatever.com',
            caption: 'Nosebleeds are Amazing', 
            tags: ['boo', 'boo']
          })
          .then(post => {
            return request(app)
              .get(`/posts/${post._id.toString()}`)
              .then(res => {
                expect(res.body).toEqual({
                  user: expect.any(String),
                  photoUrl: 'www.whatever.com',
                  caption: 'Nosebleeds are Amazing', 
                  tags: ['boo', 'boo'],
                  _id: expect.any(String)
                });
              });
          });
      });
  });
  it('patch updates the caption', () => {
    let post = null;
    return User.create({ username: 'username', password: 'password', photoUrl: 'whatever.com' })
      .then(user => {
        return Post
          .create({
            user: user._id,
            photoUrl: 'www.whatever.com',
            caption: 'Nosebleeds are Amazing', 
            tags: ['boo', 'boo']
          });
      })
      .then(createdPost => {
        post = createdPost;
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
      .then(() => {
        return request(app)
          .patch(`/posts/${post._id.toString()}`)
          .send({ caption: 'new caption' })
          .then(res => expect(res.body.caption).toEqual('new caption'));
      });
  });
  it('deletes a post by id', () => {
    let post = null;
    return User.create({ username: 'username', password: 'password', photoUrl: 'whatever.com' })
      .then(user => {
        return Post
          .create({
            user: user._id,
            photoUrl: 'www.whatever.com',
            caption: 'Nosebleeds are Amazing', 
            tags: ['boo', 'boo']
          });
      })
      .then(createdPost => {
        post = createdPost;
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
      .then(() => {
        return request(app)
          .delete(`/posts/${post._id.toString()}`)
          .then(res => expect(res.body).toEqual({
            user: expect.any(String),
            photoUrl: 'www.whatever.com',
            caption: 'Nosebleeds are Amazing', 
            tags: ['boo', 'boo'],
            _id: expect.any(String)
          }));
      });
  });
});
