const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');


module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password, photoUrl } = req.body;
    User.create({ username, password, photoUrl })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  })
  .post('/signin', (req, res, next) => { 
    const { username, password } = req.body;
    User
      .findOne({ username })
      .then(user => {
        if(user) {
          return user.compare(password)
            .then(compared => {
              if(compared) return res.send({ token: user.authToken(), user });
              return 0;
            });
        }
        next(new HttpError(401, 'Bad email or password'));
      })
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res) => res.send(req.user));
