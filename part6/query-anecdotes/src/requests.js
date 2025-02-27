import axios from 'axios'

const baseURL ="http://localhost:3001/anecdotes"

export const getAll = ()=>axios.get(baseURL).then(res => res.data)

export const addNew = (data) => axios.post(baseURL, data).then(res=>res.data)