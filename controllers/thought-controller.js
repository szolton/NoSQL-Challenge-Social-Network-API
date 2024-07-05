const { User, Thought } = require('../models');

const thoughtController = {
  // GET /api/thoughts
  // Get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v' // Exclude '__v' field from populated 'reactions'
      })
      .select('-__v') // Exclude '__v' field from the query results
      .sort({ _id: -1 }) // Sort by _id in descending order
      .then(dbThoughtData => res.json(dbThoughtData)) // Respond with JSON data
      .catch(err => {
        console.log(err); // Log any errors
        res.sendStatus(400); // Send a 400 status code for bad request
      });
  },

  // GET /api/thoughts/:id
  // Get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v' // Exclude '__v' field from populated 'reactions'
      })
      .select('-__v') // Exclude '__v' field from the query results
      .sort({ _id: -1 }) // Sort by _id in descending order
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        res.json(dbThoughtData); // Respond with JSON data of the thought
      })
      .catch(err => {
        console.log(err); // Log any errors
        res.sendStatus(400); // Send a 400 status code for bad request
      });
  },

  // POST /api/thoughts
  // Create a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } }, // Add _id of created thought to user's thoughts array
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbThoughtData); // Respond with JSON data of updated user
      })
      .catch(err => res.json(err)); // Respond with any errors encountered
  },

  // PUT /api/thoughts/:id
  // Update a thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        res.json(dbThoughtData); // Respond with JSON data of updated thought
      })
      .catch(err => res.json(err)); // Respond with any errors encountered
  },

  // DELETE /api/thoughts/:id
  // Delete a thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.id } }, // Remove thought id from user's thoughts array
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData); // Respond with JSON data of updated user
      })
      .catch(err => res.json(err)); // Respond with any errors encountered
  },

  // POST /api/thoughts/:thoughtId/reactions
  // Create a reaction to a thought
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } }, // Add reaction to reactions array in thought
      { new: true, runValidators: true }
    )
      .populate({ path: 'reactions', select: '-__v' }) // Populate reactions with fields excluding '__v'
      .select('-__v') // Exclude '__v' field from the query results
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts with this ID.' });
          return;
        }
        res.json(dbThoughtData); // Respond with JSON data of updated thought
      })
      .catch(err => res.status(400).json(err)); // Respond with any errors encountered
  },

  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  // Delete a reaction from a thought by reaction id
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } }, // Remove reaction by reactionId
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtData); // Respond with JSON data of updated thought
      })
      .catch(err => res.json(err)); // Respond with any errors encountered
  }
};

module.exports = thoughtController; // Export the thoughtController object
