import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/Add_Blog'
import Login from './components/Login'
import Notification from './components/Notifications'
import * as blogService from './services/blogs'
import * as authService from './services/authentication'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const [errorMessage, setErrorMessage] = useState(null)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //query db
  useEffect(() => {
    //GET all blogs
    const fetchAllBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    fetchAllBlogs()
  }, [])


  //Login event handler
  const handleLogin = async (event) => {
    event.preventDefault() //prevent reloading after clicking the button
    console.log('logging in with:', username, password)
    try{
      //cookie 20'
      const user = await authService.login({username, password})  //res = {token, username, name}
      //set user logged in
      setUser(user)
      //set token
      blogService.setToken(user.token)
      //clear login form
      setUsername('')
      setPassword('')
      console.log(`${user.username} logged in`)
    }catch(err){
      //notifification error
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  //add blog event handler
  const handleAddBlog = async (event) => {
    event.preventDefault()
    //new blog to add
    const newBlog = {
      author,
      url,
      title
    }
    try{
      //add blog
      const blogAdded = await blogService.addBlog(newBlog) //res = {id, author, url, title, likes, userId, year}
      //update the state of the App component to render the new blog
      setBlogs(blogs.concat(blogAdded))
      console.log('added blog', blogAdded)
      //clear blog form
      setTitle('')
      setAuthor('')
      setUrl('')
    }catch(err){
      console.error(err)
      //notifification error
      setErrorMessage('Error adding the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  //conditional rendering on login and blogs
  return (
    <div>
      
      <Notification message={errorMessage} />
      
      {user === null ? (
        <Login 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <>
          <h2>blogs</h2>
          {user.name} logged in <br/><br/>
          <h2>create new</h2>
          <BlogForm  
            handleAddBlog={handleAddBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
      )}
    </div>
  )
}

export default App