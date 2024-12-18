import Togglable from './Togglable'
import * as blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, setNotification, blogs, setBlogs, nameOfUser }) => {
  
  //session expired notification
  const notification = () => {
    //notification error
    setNotification({ msg: 'session expired (maybe)' })
    setTimeout(() => {
        setNotification({ msg:null, type:'error' })
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
      {blog.title}, {blog.author}
      <Togglable buttonLabel="view">
        {blog.url}<br></br>
        likes {blog.likes} <button onClick={handleAddLike}>like</button><br></br>
        {blog.user.name}
        { nameOfUser === blog.user.name && (
          <div><button onClick={handleDeleteBlog}>delete</button></div>
        )}
      </Togglable>
    </div>  
  )  
}

export default Blog