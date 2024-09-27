const Blog = require('../models/mongose')

const initialBlog = [
  {
    title   :  'Gym',
    author :  'Kevin Levronne',
    url: 'www.levronne.gym.com',
    likes: 32132
  },
  {
    title: 'Bikes',
    author: 'Valentino Rossi',
    url: 'www.VR46.it',
    likes: 3214515
  }
]

//can be used for creating a database object ID that does not belong to any blog object in the database.
const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Sabai Sabai Muay Thai',
    author: 'Buakaw Por Pramuk',
    url: 'www.banchameckgym.th',
    likes: 293821 })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

// function that can be used for checking the blogs stored in the database
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlog, nonExistingId, blogsInDb
}