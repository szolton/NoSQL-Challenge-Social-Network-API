// Import the Express Router
const router = require('express').Router();

// Import the thought-controller methods
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all thoughts and POST a new thought at /api/thoughts
router
  .route('/')
  .get(getAllThought) // GET all thoughts
  .post(createThought); // POST a new thought

// Set up GET one thought, PUT (update) one thought, and DELETE one thought at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById) // GET one thought by id
  .put(updateThought) // PUT (update) one thought by id
  .delete(deleteThought); // DELETE one thought by id

// Set up POST a new reaction at /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction); // POST a new reaction to a thought

// Set up DELETE a reaction at /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction); // DELETE a reaction from a thought

// Export the router to be used in other parts of the application
module.exports = router;
