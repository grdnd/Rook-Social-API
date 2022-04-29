// Require Mongoose Model Schema
const { Schema, model } = require('mongoose');

// Create User Schema
const userSchema = new userSchema(
  {
    // Username
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Email
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([\w.%+-]+)@([\w.-]+)\.([a-zA-Z\.]){2,6}$/, 'Must be a valid email address!'],
    },
    // Thoughts
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // Friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('yourFriends').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;