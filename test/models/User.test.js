require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const seedData = require('../seedData');

describe('models', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  beforeEach(() => {
    return seedData();
  });

  afterAll(() => mongoose.disconnect());

  it('validates a good model', () => {
    return User.create({
      username: 'test',
      password: '234',
      photoUrl: 'http://www.monkey.com'
      
    })
      .then(user => {
        expect(user.toJSON()).toEqual({ username: 'test', photoUrl: 'http://www.monkey.com', _id: expect.any(mongoose.Types.ObjectId) });
      });
  });

});
