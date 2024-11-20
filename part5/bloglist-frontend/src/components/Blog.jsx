import Togglable from './Togglable'
import * as blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, setNotification }) => {
  const [likes, setLikes] = useState(blog.likes)

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
      setLikes(blogUpdated.likes)
      console.log('blogUpdated:', blogUpdated)
    }catch(err){
      console.error(err)
      //notification error
      setNotification({ msg: 'session expired (maybe)' })
      setTimeout(() => {
          setNotification({ msg:null, type:'error' })
      }, 5000)
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
        likes {likes} <button onClick={handleAddLike}>like</button><br></br>
        {blog.user.name}
      </Togglable>
    </div>  
  )  
}

export default Blog