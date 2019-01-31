const Chance = require('chance');
const chance = new Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const CommentModel = require('../lib/models/Comment');

const DEFAULT_TOTAL_USERS = 10;
const DEFAULT_TOTAL_POSTS = 100;
const DEFAULT_TOTAL_COMMENTS = 500;
let users = null;

module.exports = ((totalUsers = DEFAULT_TOTAL_USERS, totalPosts = DEFAULT_TOTAL_POSTS, totalComments = DEFAULT_TOTAL_COMMENTS) => {
  return Promise.all(
    [...Array(totalUsers)].map((ele, i) => User.create({
      username: `user${i}`,
      password: 'password',
      photoUrl: 'monkey.com'
    }))
  )
    .then(usersCreated => {
      users = usersCreated;
      return Promise.all(
        [...Array(totalPosts)].map(() => {
          return Post.create({
            user: chance.pickone(users)._id,
            photoUrl: 'blah.com',
            caption: 'its so blah'
          });
        })
      );
    })
    .then(posts => {
      return Promise.all(
        [...Array(totalComments)].map(() => {
          return CommentModel.create({
            commentBy: chance.pickone(users)._id,
            post: chance.pickone(posts)._id,
            comment: chance.sentence()
          });
        })
      );
    });
});
