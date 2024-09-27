//import library
const mongoose = require('mongoose')

//checks if arguments are provided
const inputArgv = process.argv.length

if (inputArgv!==3 && inputArgv!==7){
  console.log('give psw, title, author, url and likes as arguments')
  process.exit(1)
}
//save psw
const psw = process.argv[2]
//set url  connection to cloud db
const url =
  `mongodb+srv://lucabk96:${psw}@fullstackopen.8ip4c.mongodb.net/TestBlogListDB?retryWrites=true&w=majority&appName=FullStackOpen`
//allows you to query fields that are not defined in the schema
mongoose.set('strictQuery',false)
//connection to db
mongoose.connect(url)
  .then( () => {
    console.log('connected to TestBlogListDB')
  })


//schema definition
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
//model creation
const Blog = mongoose.model('Blog', blogSchema)

//GET
if (inputArgv === 3){
  Blog.find({}).then(result => {
    console.log('Blog List:')
    result.forEach(blog => {
      console.log(blog.title, blog.author, blog.url, blog.likes)
    })
    mongoose.connection.close()//close conn
  })
}

//POST
else if (inputArgv === 7){
  //new blog
  const blog = new Blog({
    title   :   process.argv[3],
    author :  process.argv[4],
    url: process.argv[5],
    likes: process.argv[6]
  })
  blog
    .save()
    .then(() => {
      console.log(`${blog.title} added to db`)
      mongoose.connection.close()//close conn
    })
}