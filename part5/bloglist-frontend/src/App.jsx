import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notifications'
import * as blogService from './services/blogs'
import * as authService from './services/authentication'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
      )}
    </div>
  )
}

export default App