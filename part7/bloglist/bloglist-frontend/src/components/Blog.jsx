import Togglable from './Togglable'
import * as blogService from '../services/blogs'
import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Blog = ({ queryClient, nameOfUser, blog }) => {
  const [notificationValue, notificationValueDispatcher] = useContext(NotificationContext)
  
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deletBlog,
    onSuccess : () => {
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogs = blogs.filter( b => b.id !== blog.id)
      queryClient.setQueryData(['blogs'], newBlogs)
      console.log('blog removed')
    },
    onError : (error) => {
      errorNotification(error.message)
    }
  })
  
  const errorNotification = (error) => {
    // Show error notification if the mutation fails
    notificationValueDispatcher({ 
      type:'SHOW_NOTIFICATION', 
      payload: 
          {
              msg: error, 
              type:'error' 
          }
      })
    setTimeout(() => {
        notificationValueDispatcher({ type:'HIDE_NOTIFICATION' })
    }, 5000)
  }

  //handle delete blog
  const handleDeleteBlog = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)){
      //delete blog mutation
      deleteBlogMutation.mutate(blog.id)
    }
  }

  //style
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        <div className='TitleAuthor'>
            {blog.title}, {blog.author}
        </div>
      </Link>

        { nameOfUser === blog.user.name && (
          <div><button onClick={handleDeleteBlog}>delete</button></div>
        )}
    </div>  
  )  
}

export default Blog