const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//GET: get all users
usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    /*The Mongoose join is done with the populate method. The argument given to the populate method defines
    that the ids referencing blog objects in the blogs field of the user document will be replaced by
    the referenced blog documents*/
    .populate('blogs',                    //populate the user's blogs
      { url:1, title:1, author:1, })//choosing the fields we want to include from the documents
  res.json(users)
})


//POST: create a new user
usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  //password must be at least 3 characters long
  if (password.length<3)
    return res.status(400).json({ error: 'pass\'s length must be at least 3 characters' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)//hash the password

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter