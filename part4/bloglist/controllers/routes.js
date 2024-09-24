const router = require('express').Router()//A router object is an instance of middleware and routes
const Blog = require('../models/mongose')

//GET
router.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})


//POST
router.post('/', (req, res, next) => {
  const blog = new Blog(req.body) //new entry

  blog
    .save()
    .then(savedBlog => {
      res.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = router