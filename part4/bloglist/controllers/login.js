const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })//searches for a user in the database with the provided username
  const passwordCorrect = user === null
    ? false
    //If the user is found, the code compares the provided password with the stored password hash
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {//If the user is not found or the password is incorrect
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }
  //If the credentials are valid, the code creates a token payload (userForToken) containing the username and user ID
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  /*The token is then signed using a secret key from the environment variables and expires in one hour
  Once the token expires, the client app needs to get a new token. Usually, this happens by forcing the user to re-login to the app*/
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  //A successful request is responded to with the status code 200 OK
  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter