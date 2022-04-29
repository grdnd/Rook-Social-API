// Require Models
const { User, Thought } = require('../models');

const userController = {
  // get all users
  getUsers(req, res) {
    User.find()
    .select('-__v')
    .then((UsersData) => {
      res.json(UsersData)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // get user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ 'User id was not found' });
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },
  // create new user
  newUser(req, res) {
    User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // update user by ID
  editUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) => {
        if (user == null) {
          return res.status(404).json({ message: "User id was not found" });
        }
        res.json(user);
      })
      .catch ((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete user by ID
  delUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: 'User id was not found' });
      }
      //      BONUS: delete associated thoughts
      return Thought.deleteMany({ _id: { $in: user.thoughts } });
    })
    .then(() => {
      res.json({ message: 'Users have been deleted, along with their minds'})
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  },
  // add friend to friend list
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
    .then((user) => {
      if (user == null) {
        return res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // remove friend from friend list by ID
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
    .then ((user) => {
      if (user == null) {
        return res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  },
};

module.exports = userController;