// Require Models
const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
  // get all users
  // get user by ID
  // create new user
  // update user by ID
  // delete user by ID
  //      BONUS: delete associated thoughts
  //      BONUS: get id of user's 'thoughts' and delete them all
  // add friend to friend list
  // remove friend from friend list by ID
}

async function getUser(req, res, next) {
  // create a user
  let user;
  try {
    // find user by ID
    user = await User.findById(req.params.id);
    // check if user exists
    if(user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

module.exports = userController;