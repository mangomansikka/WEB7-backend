const express = require("express");
const router = express.Router();

const { signupUser, loginUser } = require("../controllers/userController");


// signup
router.post('/signup', signupUser)

// login
router.post('/login', loginUser)

/*
// get all users
router.get('/', getUsers);

// add a new user
router.post('/', addUser);

// get user by id
router.get('/:id' , getUserById);

// update user by id
router.put('/:id', updateUser);

// delete user by id
router.delete('/:id', deleteUser);
*/

module.exports = router;