const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/models/User');
const seedData = require('../seedData');

describe('app', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  beforeEach(() => {
    return seedData();
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({
        username: 'smith',
        password: 'password',
        photoUrl: 'www.amazon.com/mygreatestphoto'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            username: 'smith',
            photoUrl: 'www.amazon.com/mygreatestphoto',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('can signin a user', () => {
    return User
      .create({ 
        username: 'smith',
        password: 'password',
        photoUrl: 'www.amazon.com/mygreatestphoto'
      })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'smith',
            password: 'password'
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                username: 'smith',
                photoUrl: 'www.amazon.com/mygreatestphoto',
                _id: expect.any(String)
              },
              token: expect.any(String)
            });
          });
      });
  });

  it('has a /verify route', () => {
    return User
      .create({
        username: 'smith',
        password: 'password',
        photoUrl: 'www.amazon.com/mygreatestphoto'
      })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'smith',
            password: 'password'
          })
          .then(res => res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          username: 'smith',
          photoUrl: 'www.amazon.com/mygreatestphoto',
          _id: expect.any(String)
        });
      });
  });
});
