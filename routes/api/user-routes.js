// Import the Express Router
const router = require('express').Router();

// Import the user-controller methods
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all users and POST a new user at /api/users
router
  .route('/')
  .get(getAllUser) // GET all users
  .post(createUser); // POST a new user

// Set up GET one user, PUT (update) one user, and DELETE one user at /api/users/:id
router
  .route('/:id')
  .get(getUserById) // GET one user by id
  .put(updateUser) // PUT (update) one user by id
  .delete(deleteUser); // DELETE one user by id

// Set up POST (add) and DELETE (remove) a friend at /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend) // POST (add) a friend to a user
  .delete(deleteFriend); // DELETE (remove) a friend from a user

// Export the router to be used in other parts of the application
module.exports = router;
