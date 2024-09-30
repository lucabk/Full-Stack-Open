const router = require('express').Router()//A router object is an instance of middleware and routes
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

//GET all
router.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})//find all the entries
    .populate('user', { username:1, name:1 })//populate the user field of the blog
  res.json(blogs)
})
//GET by id
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if(blog){
    res.json(blog)
    logger.info(blog.toJSON())
  }
  else
    res.status(404).end()//blog not found
})


//POST
router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  /*The function getTokenFrom extracts the token from the request object. The function jwt.verify decodes the token
  The object decoded from the token contains the username and id fields, which tell the server who made the request.*/
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  //If the token is missing or it is invalid, the exception JsonWebTokenError is raised

  /*If the object decoded from the token does not contain the user's identity (decodedToken.id is undefined),
  error status code 401 unauthorized is returned*/
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  //The function retrieves the user ID from the decoded token and searches for the user in the database
  const user = await User.findById(decodedToken.id)

  if(!user)//user not found in users collection
    return res.status(400).json({ error:'must specify an existent user when adding a blog' })

  const blog = new Blog({ title, author, url, likes, user:user._id }) //new entry (user._id===decodedToken.id)
  const savedBlog = await blog.save()//save the new entry

  user.blogs = user.blogs.concat(savedBlog._id)//add the new entry to the user's list of blogs
  await user.save()//save the user

  res.status(201).json(savedBlog)
})

//DELETE
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  /*In both of the "successful" cases of deleting a resource, the backend responds with the status code 204.
    The two different cases are deleting a blog that exists, and deleting a blog that does not exist in the database*/
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})


//PUT
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { likes } = req.body

  const blogUpdated = await Blog.findByIdAndUpdate(
    id,
    { likes:likes },
    { new:true, runValidators:true, context:'query' }
  )

  if(blogUpdated)
    res.json(blogUpdated)
  else  //if blogUpdated === NULL return a 404 (it will not trigger catch automatically)
    res.status(404).end()
})


module.exports = router