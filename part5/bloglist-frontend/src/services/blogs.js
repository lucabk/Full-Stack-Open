import axios from 'axios'

const baseUrl = '/api/blogs'           //base blog URL
export let token = null                //JWTtoken

// set new token 
export const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

//get all blogs
export const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('getAll() res:', response.data)
  return response.data
}

//add blog
export const addBlog = async (newBlog) => {
  const config = { headers: { Authorization: token } } //Authorization header of the HTTP request
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

//update blog (likes)
export const addLike = async (blogToUpdate, blogId) => {
  const config = { headers: { Authorization: token } }
  return (await axios.put(`${baseUrl}/${blogId}`, blogToUpdate, config)).data
}