import Togglable from './Togglable'
import * as blogService from '../services/blogs'
import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'
import { useMutation } from '@tanstack/react-query'

const Blog = ({ queryClient, nameOfUser, blog }) => {
  const [notificationValue, notificationValueDispatcher] = useContext(NotificationContext)
  
  const updateBlogMutation = useMutation({
    mutationFn: ({ blogToUpdate, blogId }) => blogService.addLike(blogToUpdate, blogId),
    onSuccess : (blogUpdated) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogs = blogs.filter(b => b.id !== blogUpdated.id ? b : b.likes = blogUpdated.likes)
      queryClient.setQueryData(['blogs'], newBlogs)
      console.log('blogUpdated:', blogUpdated)
    },
    onError : (error) => {
      console.error('add like blog error:',error.message)
      errorNotification(error.message)
    }
  })

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


  //handle add likes to blog
  const handleAddLike = async (event) => {
    event.preventDefault()
    const blogToUpdate = {
      user:blog.user.name,
      likes:1,
      author:blog.author,
      title:blog.title,
      url:blog.url
    }
    //add like mutation
    updateBlogMutation.mutate({
      blogToUpdate,
      blogId: blog.id
    })
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
      <div className='TitleAuthor'>{blog.title}, {blog.author}</div>
      <Togglable buttonLabel="view">
        {blog.url}<br></br>
        <div id='likes'>likes {blog.likes}</div> <button onClick={handleAddLike}>like</button><br></br>
        {blog.user.name}
        { nameOfUser === blog.user.name && (
          <div><button onClick={handleDeleteBlog}>delete</button></div>
        )}
      </Togglable>
    </div>  
  )  
}

export default Blog