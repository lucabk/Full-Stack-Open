import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/Add_Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notifications'
import UserInfo from './components/UsersInfo'
import * as blogService from './services/blogs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './context/notificationContext'
import UserContext from './context/userContext'
import SingleBlog from './components/SingleBlog'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import UserBlogs from './components/UserBlogs'

const App = () => {
//  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [notification, notificationDispatcher] = useContext(NotificationContext)
  const [user, userDispatcher] = useContext(UserContext)
  // Initialize the query client
  const queryClient = useQueryClient()
  
  //browser local storage
  useEffect(() => {
    //the application checks if user details of a logged-in user can already be found on the local storage
    const loggedUserJSON = window.localStorage.getItem('userlogged')
    //if they are there, the details are saved to the state of the application and to blogService
    if (loggedUserJSON){
      const userInfo = JSON.parse(loggedUserJSON)
      //set user state and token value
      userDispatcher({ type: 'SAVE_USER', payload: userInfo})
      blogService.setToken(userInfo.token)
    }
  }, [])
  
  
  // Fetch blogs data using react-query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })
  
  // Match the route to get the single blog id from the URL
  const match = useMatch('/blogs/:id')
  let singleBlog = null;
  // Find the blog that matches the id from the URL
  if(data){
    singleBlog = match ? data.find(b => b.id === Number(match.params.id)) : null
  }

  // Handle loading and error states
  if (isPending) {
    return <span>Loading blogs...</span>
  }
  if (isError) {
    notificationDispatcher({
      type: 'SHOW_NOTIFICATION',
      payload: {
        msg: error.message,
        type: 'error'
      }
    })
  }
  

  //conditional rendering on login and blogs based on 'user' state
  return (
    <div>
      <Notification />
      
      {user === null ? (
        <Login />
      ) : (
        <>
          <Logout />
          
          <Routes>
            <Route path='/' element = {
              <>
                {blogFormVisible === false ? (
                    <div><br></br><button onClick={() => setBlogFormVisible(true)}>create new blog</button></div>
                ) : (
                  <BlogForm 
                    setBlogFormVisible={setBlogFormVisible}
                    queryClient={queryClient}
                  />
                )}

                {data.sort((a, b) => b.likes - a.likes).map(blog => (
                  <Blog 
                    key={blog.id} 
                    blog={blog}
                    nameOfUser={user.name}
                    queryClient={queryClient}
                  />
                ))}
             </>
            } />
            <Route path='/users' element={<UserInfo />} />
            <Route path='/users/:id' element={<UserBlogs />} />
            <Route path='/blogs/:id' element={<SingleBlog singleBlog={singleBlog} queryClient={queryClient}/>} />
          </Routes>

        </>
      )}
    </div>
  )
}

export default App