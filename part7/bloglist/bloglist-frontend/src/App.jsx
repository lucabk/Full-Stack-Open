import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/Add_Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notifications'
import * as blogService from './services/blogs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './context/notificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [notification, notificationDispatcher] = useContext(NotificationContext)
  // Initialize the query client
  const queryClient = useQueryClient()

  //browser local storage
  useEffect(() => {
    //the application checks if user details of a logged-in user can already be found on the local storage
    const loggedUserJSON = window.localStorage.getItem('userlogged')
    //if they are there, the details are saved to the state of the application and to blogService
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      //set user state and token value
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  // Fetch blogs data using react-query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })
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
        <Login setUser={setUser} />
      ) : (
        <>
          <Logout setUser={setUser} user={user} />
          
          {blogFormVisible === false ? (
              <div><br></br><button onClick={() => setBlogFormVisible(true)}>create new blog</button></div>
          ) : (
            <BlogForm 
              setBlogFormVisible={setBlogFormVisible}
              user={user}
              queryClient={queryClient}
            />
          )}

          {data.sort((a, b) => b.likes - a.likes).map(blog => 
            <Blog 
              key={blog.id} 
              blog={blog} 
              blogs={blogs} 
              setBlogs={setBlogs} 
              nameOfUser={user.name}
            />
            )}
        </>
      )}
    </div>
  )
}

export default App