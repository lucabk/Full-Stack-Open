const dummy = () => {
  return 1
}

const totalLikes  = (blogs) => {
  return blogs.reduce( (prev, act) => prev+act.likes,0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length===0) return {}
  const blogMostLikes = blogs.reduce( (prev, act) => act.likes>prev.likes? act: prev, blogs[0])
  // eslint-disable-next-line no-unused-vars
  const blog = {
    title: blogMostLikes.title,
    author: blogMostLikes.author,
    likes: blogMostLikes.likes
  }
  return blog
}

const mostBlogs = (blogs) => {
  if (blogs.length===0) return {}
  const authorBlogs = []
  for (let i=0; i<blogs.length; i++){
    let element = authorBlogs.find(a => a.author===blogs[i].author)
    if(element){
      let newValue = { ...element, blogs:element.blogs+1 }
      let index = authorBlogs.indexOf(element)
      authorBlogs.splice(index,1)
      authorBlogs.push(newValue)
    }
    else
      authorBlogs.push({ author:blogs[i].author, blogs:1 })
  }
  return authorBlogs.reduce( (prev, act) =>
    act.blogs>prev.blogs? act: prev)
}

module.exports = {
  totalLikes,
  dummy,
  favoriteBlog,
  mostBlogs
}