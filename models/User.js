// require mongoose model schema
const { Schema, model } = require('mongoose');

// create user schema
const userSchema = new Schema(
  {
    // username
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // email
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([\w.%+-]+)@([\w.-]+)\.([a-zA-Z\.]){2,6}$/, 'Must be a valid email address!'],
    },
    // thoughts
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

userSchema
.virtual('yourFriends')
.get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;