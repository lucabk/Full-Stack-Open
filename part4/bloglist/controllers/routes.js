const router = require('express').Router()//A router object is an instance of middleware and routes
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

//GET all
router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
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
  const blog = new Blog(req.body) //new entry
  const savedBlog = await blog.save()//save the new entry
  const user = await User.findById(req.body.user)//find the user who created the new entry
  if(!user)//user not found
    return res.status(400).json({ error:'must specify user when adding a blog' })
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