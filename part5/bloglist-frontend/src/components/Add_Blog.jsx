import { useState } from 'react'
import * as blogService from '../services/blogs'

const BlogForm = ({ setBlogFormVisible, setNotification, setBlogs, blogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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
            //hide Blog Form
            setBlogFormVisible(false)
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

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAddBlog}>
                <div>
                    title: <input required value={title} onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    author: <input required value={author} onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    url: <input required type="url" value={url} onChange={({target}) => setUrl(target.value)}/>
                </div> 
                <button type="submit">create</button>
            </form> 
            <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
    )
}

export default BlogForm