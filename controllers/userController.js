const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, firstName, lastName, phoneNumber, role} = req.body;
  console.log(req.body);

  try {
    const user = await User.signup(email, password, firstName, lastName, phoneNumber, role);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({email, firstName, lastName, phoneNumber, role, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token}) 
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { signupUser, loginUser }