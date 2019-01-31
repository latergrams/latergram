const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

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

});
