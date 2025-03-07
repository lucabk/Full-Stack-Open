import * as authService from '../services/authentication'
import * as blogService from '../services/blogs'
import UserContext from '../context/userContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem, Menu, Button, Header } from 'semantic-ui-react'

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


    return(
        <>
            <Menu style={style}>
                <MenuItem>
                    <Link to='/'>blogs</Link>
                </MenuItem>
                <MenuItem>
                    <Link to='/users'>users</Link>
                </MenuItem>

                <Menu.Menu position='right'>
                    <MenuItem>
                    < Header size='small'>{user.name}</Header>
                    </MenuItem>
                    <MenuItem>
                        <Button secondary onClick={handleLogout}>logout</Button>
                    </MenuItem>
                </Menu.Menu>
            </Menu>
            <Header as='h1' textAlign='center'>blog app</Header>
        </>
    )
}

export default Logout