import { useState } from 'react'
import * as blogService from '../services/blogs'
import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'
import { useMutation } from '@tanstack/react-query'

const BlogForm = ({ setBlogFormVisible, user, queryClient }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notification, notificationDispatcher] = useContext(NotificationContext)

    // Mutation for adding a new blog
    const newBlogMutation = useMutation({
        mutationFn: blogService.addBlog,
        onSuccess: (blogAdded) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(blogAdded))
            //notification success 
            notificationDispatcher({ 
                type:'SHOW_NOTIFICATION', 
                payload: 
                    {
                        msg: `a new blog '${blogAdded.title}' by ${blogAdded.author} added`, 
                        type:'success' 
                    }
                })
            //hide Blog Form
            setBlogFormVisible(false)
            setTimeout(() => {
                notificationDispatcher({ type:'HIDE_NOTIFICATION' })
            }, 5000)
            //adding user logged in
            blogAdded.user = user
            console.log('added blog', blogAdded)
            //clear blog form
            setTitle('')
            setAuthor('')
            setUrl('')
        },
        onError: (error) => {
            console.error('POST blog error:',error.message)
            // Show error notification if the mutation fails
            notificationDispatcher({ 
                type:'SHOW_NOTIFICATION', 
                payload: 
                    {
                        msg: error.response.data.error, 
                        type:'error' 
                    }
                })
            setTimeout(() => {
                notificationDispatcher({ type:'HIDE_NOTIFICATION' })
            }, 5000)
        }
    })

    //add blog event handler
    const handleAddBlog = async (event) => {
        event.preventDefault()
        //new blog to add
        const newBlog = {
            author,
            url,
            title
        }
        //mutate
        newBlogMutation.mutate(newBlog)
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