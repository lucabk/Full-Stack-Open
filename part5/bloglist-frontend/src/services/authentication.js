import axios from 'axios'
const loginUrl = '/api/login'
const logoutUrl = '/api/logout'
import { token } from './blogs'

export const login = async (credentials) => (await axios.post(loginUrl, credentials)).data

export const logout = async () => {
    const config = { headers: { Authorization: token } } 
    const res = await axios.post(logoutUrl, {}, config)
    return res.data
}