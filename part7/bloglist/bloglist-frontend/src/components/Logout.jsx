import * as authService from '../services/authentication'
import * as blogService from '../services/blogs'
import UserContext from '../context/userContext'
import { useContext } from 'react'

const Logout = () => {
    const [user, userDispatcher] = useContext(UserContext)

    //Logout event handler
    const handleLogout = async (event) => {
        event.preventDefault()
        try{
            //POST logout
            const res = await authService.logout()
            console.log(res)
        }catch(err){
            console.error(err)
        }finally{
            //delete {user} in local storage
            window.localStorage.removeItem('userlogged')
            //set token to null
            blogService.setToken(null)
            //delete user state
            userDispatcher({ type: 'DELETE_USER'})
        }
    }

    return(
        <>
            <h2>blogs</h2>
            {user.name} logged in 
            <button onClick={handleLogout}>logout</button>
        </>
    )
}

export default Logout