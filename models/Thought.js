// require mongoose model schema
const { Schema, model } = require('mongoose');
// require reaction schema for reactions
const reactionSchema = require('./Reaction');

// create new schema for thoughts
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Must leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdOn: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;