const { Router } = require('express');
const  Post = require('../models/Post'); 

module.exports = Router()
  .post('/', (req, res, next) => {
    const { user, photoUrl, caption, tags } = req.body;
    Post
      .create({ user, photoUrl, caption, tags }) 
      .then(post => res.send(post))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Post
      .find()
      .then(post => res.send(post))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Post
      .findById(_id)
      .then(post => res.send(post))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const _id = req.params.id;
    Post
      .findByIdAndUpdate(_id, req.body, { new:true })
      .then(post => res.send(post))
      .catch(next);
  });
