import * as blogService from '../services/blogs'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'


const SingleBlog = ({ singleBlog, queryClient }) => {
    const [notificationValue, notificationValueDispatcher] = useContext(NotificationContext)

    //add like mutation
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
        user:singleBlog.user.name,
        likes:1,
        author:singleBlog.author,
        title:singleBlog.title,
        url:singleBlog.url
        }
        //add like mutation
        updateBlogMutation.mutate({
        blogToUpdate,
        blogId: singleBlog.id
        })
    }

    return (
        <section>
           <h2>{singleBlog.title} {singleBlog.author}</h2>
           <p>{singleBlog.url}</p>
           {singleBlog.likes} likes <button onClick={handleAddLike}>like</button>
           <p>added by {singleBlog.user.name}</p>
        </section>
    )
}

export default SingleBlog