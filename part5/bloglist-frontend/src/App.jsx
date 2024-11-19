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
  
  const [notification, setNotification] = useState({ msg:null, type:'error'})
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //postgreSQL
  useEffect(() => {
    //GET all blogs
    const fetchAllBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    fetchAllBlogs()
  }, [])

  //browser local storage
  useEffect(() => {
    //the application checks if user details of a logged-in user can already be found on the local storage
    const loggedUserJSON = window.localStorage.getItem('userlogged')
    //if they are there, the details are saved to the state of the application and to blogService
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Login event handler
  const handleLogin = async (event) => {
    event.preventDefault() //prevent reloading after clicking the button
    console.log('logging in with:', username, password)
    try{
      //cookie 20'
      const user = await authService.login({username, password})  //res = {token, username, name}
      //save user into browser memory (type 'window.localStorage' on the browser console)
      window.localStorage.setItem('userlogged', JSON.stringify(user))
      //set user logged in
      setUser(user)
      //set token
      blogService.setToken(user.token)
      //clear login form
      setUsername('')
      setPassword('')
      console.log(`${user.username} logged in`)
    }catch(err){
      console.error(err)
      //notification error
      setNotification({ msg: 'Wrong credentials' })
      setTimeout(() => {
        setNotification({ msg:null, type:'error' })
      }, 5000)
    }
  }

  //Logout event handler
  const handleLogout = async (event) => {
    event.preventDefault()
    try{
      //POST logout
      const res = await authService.logout()
      console.log(res)
    }catch(err){
      console.error(err)
    }finally{
      //delete {user} in local storage
      window.localStorage.removeItem('userlogged')
      //set token to null
      blogService.setToken(null)
      //delete user state
      setUser(null)
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
      //notification success 
      setNotification({ msg:`a new blog '${blogAdded.title}' by ${blogAdded.author} added`, type:'success' })
      setTimeout(() => {
        setNotification({ msg:null, type:'error'})
      }, 5000)

    }catch(err){
      console.error(err)
      //notification error
      setNotification({ msg:'Error adding the blog' })
      setTimeout(() => {
        setNotification({ msg:null, type:'error'})
      }, 5000)
    }
  }


  //conditional rendering on login and blogs based on 'user' state
  return (
    <div>
      
      <Notification message={notification.msg} type={notification.type} />
      
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
          {user.name} logged in 
          <button onClick={handleLogout}>logout</button>
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