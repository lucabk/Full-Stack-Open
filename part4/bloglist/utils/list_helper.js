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

module.exports = {
  totalLikes,
  dummy,
  favoriteBlog
}