// Importing User and Thought models from '../models'
const { User, Thought } = require('../models');

const userController = {
  // GET /api/users
  // Get all users
  getAllUser(req, res) {
    User.find({})
      .select('-__v') // Exclude '__v' field from the query results
      .sort({ _id: -1 }) // Sort by _id in descending order
      .then(dbUserData => res.json(dbUserData)) // Respond with JSON data
      .catch(err => {
        console.log(err); // Log any errors
        res.sendStatus(400); // Send a 400 status code for bad request
      });
  },

  // GET /api/users/:id
  // Get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v' // Exclude '__v' field from populated 'thoughts'
      })
      .populate({
        path: 'friends',
        select: '-__v' // Exclude '__v' field from populated 'friends'
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData); // Respond with JSON data of the user
      })
      .catch(err => {
        console.log(err); // Log any errors
        res.sendStatus(400); // Send a 400 status code for bad request
      });
  },

  // POST /api/users
  // Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData)) // Respond with JSON data of created user
      .catch(err => res.json(err)); // Respond with any errors encountered
  },

  // PUT /api/users/:id
  // Update a user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData); // Respond with JSON data of updated user
      })
      .catch(err => res.json(err)); // Respond with any errors encountered
  },

  // DELETE /api/users/:id
  // Delete a user by id, including associated thoughts
  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id }) // Delete all thoughts associated with the user
      .then(() => {
        User.findOneAndDelete({ _id: params.id }) // Delete the user
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData); // Respond with JSON data of deleted user
          });
      })
      .catch(err => res.json(err)); // Respond with any errors encountered
  },

  // POST /api/users/:userId/friends/:friendId
  // Add a friend to a user by user id and friend id
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } }, // Add friendId to the friends array
      { new: true } // Return updated user data
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData); // Respond with JSON data of updated user
      })
      .catch(err => res.status(400).json(err)); // Respond with any errors encountered
  },

  // DELETE /api/users/:userId/friends/:friendId
  // Remove a friend from a user by user id and friend id
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } }, // Remove friendId from the friends array
      { new: true } // Return updated user data
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData); // Respond with JSON data of updated user
      })
      .catch(err => res.status(400).json(err)); // Respond with any errors encountered
  }
};

module.exports = userController; // Export the userController object
