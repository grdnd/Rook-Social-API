// require mongoose model schema
const { Schema, Types } = require('mongoose');

// create new schema for reactions
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 200
    },
    username: {
      type: String,
      required: true
    },
    {
      createdOn: {
        type: Date,
        default: Date.now
      }
    },
    {
      toJSON: {
        getters: true
      }
    id: false
  }
);

module.exports = reactionSchema;