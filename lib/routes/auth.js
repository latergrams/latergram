const { Router } = require('express');
const User = require('../models/User');


module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password, photoUrl } = req.body;
    User.create({ username, password, photoUrl })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  });
