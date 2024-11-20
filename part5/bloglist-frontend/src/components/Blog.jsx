import Togglable from './Togglable'

const Blog = ({ blog }) => {
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
        <BlogDetails 
          url={blog.url} 
          likes={blog.likes} 
          user={blog.user.name}
        />
      </Togglable>
    </div>  
  )  
}


//single blog details
const BlogDetails = ({ url, likes, user }) => (
  <div>
    {url}<br></br>
    likes {likes} <button>like</button><br></br>
    {user}
  </div>
)

export default Blog