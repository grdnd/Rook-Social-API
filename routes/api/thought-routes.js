// require router
const router = require('express').Router();

const {
  getThoughts,
  getThoughtById,
  newThought,
  editThought,
  delThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getThoughts).post(newThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(editThought).delete(delThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
