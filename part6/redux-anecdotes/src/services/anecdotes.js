import axios from "axios"

const baseURL = "http://localhost:3001/anecdotes"

//GET
const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

//POST
const addAnecdote = async (content) => {
    const obj = {content, votes:0 }
    const res = await axios.post(baseURL, obj)
    return res.data
}

export { getAll, addAnecdote }