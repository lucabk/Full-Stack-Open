const dummy = () => {
  return 1
}

module.exports = {
  dummy
}
const totalLikes  = (blogs) => {
  return blogs.reduce( (prev, act) => prev+act.likes,0)
}

module.exports = {
  totalLikes,
  dummy
}