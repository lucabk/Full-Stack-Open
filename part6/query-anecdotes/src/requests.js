import axios from 'axios'

const baseURL ="http://localhost:3001/anecdotes"
//GET
export const getAll = ()=>axios.get(baseURL).then(res => res.data)
//POST
export const addNew = (data) => axios.post(baseURL, data).then(res=>res.data)
//PUT
export const addVote = async (anecdoteUpdated) => {
    const res = await axios.put(`${baseURL}/${anecdoteUpdated.id}`, anecdoteUpdated)
    return res.data
}
