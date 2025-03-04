import Togglable from './Togglable'
import * as blogService from '../services/blogs'
import { useState } from 'react'
import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'

const Blog = ({ blog, blogs, setBlogs, nameOfUser }) => {
  const [notificationValue, notificationValueDispatcher] = useContext(NotificationContext)
  
  //session expired notification
  const notification = () => {
    //notification error
    notificationValueDispatcher({ type:'SHOW_NOTIFICATION', payload: {msg: 'session expired', type:'error' }})
    setTimeout(() => {
        notificationValueDispatcher({ type:'HIDE_NOTIFIATION' })
    }, 5000)
  }

  //handle add likes to blog
  const handleAddLike = async (event) => {
    event.preventDefault()
    try{
      const blogToUpdate = {
        user:blog.user.name,
        likes:1,
        author:blog.author,
        title:blog.title,
        url:blog.url
      }
      //update db
      const blogUpdated = await blogService.addLike(blogToUpdate, blog.id)
      //update frontend
      const newBlogs = blogs.filter(b => b.id !== blogUpdated.id ? b : b.likes = blogUpdated.likes)
      setBlogs(newBlogs)
      console.log('blogUpdated:', blogUpdated)
    }catch(err){
      console.error(err)
      //notification error
      notification()
    }
  }

  //handle delete blog
  const handleDeleteBlog = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)){
      try{
        //update db
        await blogService.deletBlog(blog.id)  
        //update frontend
        const newBlogs = blogs.filter( b => b.id !== blog.id)
        setBlogs(newBlogs)
        console.log('blog deleted!')
      }catch(err){
        console.error(err)
        //notification error
        notification()
      }
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