import axios from 'axios'
const loginUrl = '/api/login'

export const login = async (credentials) => (await axios.post(loginUrl, credentials)).data