const router = require('express').Router()//A router object is an instance of middleware and routes
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

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


//POST middleware only for a specific operation
router.post('/', middleware.userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body

  if(!req.user)//user not found in users collection
    return res.status(400).json({ error:'must specify an existent user when adding a blog' })

  const blog = new Blog({ title, author, url, likes, user:req.user._id }) //new entry (user._id===decodedToken.id)
  const savedBlog = await blog.save()//save the new entry

  req.user.blogs = req.user.blogs.concat(savedBlog._id)//add the new entry to the user's list of blogs
  await req.user.save()//save the user

  res.status(201).json(savedBlog)
})

//DELETE
router.delete('/:id', middleware.userExtractor, async (req, res) => {
  const id = req.params.id

  //check if the blog exists
  const blog = await Blog.findById(id)
  if(!blog)
    res.status(204).end()//blog not found
  const blogCreator = blog.user.toString()

  if(!req.user)//user not found in users collection
    return res.status(401).json({ error:'must specify an existent user when deleting a blog' })

  if (blogCreator === req.user._id.toString()){
    await Blog.findByIdAndDelete(id)
    req.user.blogs = req.user.blogs.filter(b => b._id.toString() !== blog._id.toString())

    await req.user.save()
    res.status(204).end()
  }
  else
    return res.status(403).json({ error: 'a blog can be deleted only by the user who added it' })

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