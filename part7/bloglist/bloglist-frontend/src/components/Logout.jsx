import * as authService from '../services/authentication'
import * as blogService from '../services/blogs'
import UserContext from '../context/userContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

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

    const style = {
        backgroundColor: 'lightgrey',
        padding: '10px',
        borderRadius: '5px'
    }
    const padding = {
        paddingRight: 5
    }

    return(
        <>
            <section style={style}>
                <Link style={padding} to='/'>blogs</Link>
                <Link style={padding} to='/users'>users</Link>
                <span style={padding}>{user.name} logged in</span> 
                <button style={padding} onClick={handleLogout}>logout</button>
            </section>
            <h1>blog app</h1>
        </>
    )
}

export default Logout