const BlogForm = ({ handleAddBlog, title, setTitle, author, setAuthor, url, setUrl }) => (
    <form onSubmit={handleAddBlog}>
        <div>
            title: <input required value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
            author: <input value={author} onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
            url: <input required type="url" value={url} onChange={({target}) => setUrl(target.value)}/>
        </div> 
        <button type="submit">create</button>
    </form>
)

export default BlogForm