import { useState } from 'react'
import * as authService from '../services/authentication'
import * as blogService from '../services/blogs'

const Login = ({ setUser, setNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Login event handler
    const handleLogin = async (event) => {
        event.preventDefault() //prevent reloading after clicking the button
        console.log('logging in with:', username, password)
        try{
            //cookie 20'
            const user = await authService.login({username, password})  //res = {token, username, name}
            //save user into browser memory (type 'window.localStorage' on the browser console)
            window.localStorage.setItem('userlogged', JSON.stringify(user))
            //set user logged in
            setUser(user)
            //set token
            blogService.setToken(user.token)
            //clear login form
            setUsername('')
            setPassword('')
            console.log(`${user.username} logged in`)
        }catch(err){
            console.error(err)
            //notification error
            setNotification({ msg: 'Wrong credentials' })
            setTimeout(() => {
                setNotification({ msg:null, type:'error' })
            }, 5000)
        }
    }
    
    return(
        <form onSubmit={handleLogin}>
            <div>
                <h2>Login to application</h2>
                username:
                <input autoFocus
                    type="text"
                    name="Username"
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password:
                <input
                    type="password"
                    name="Password"
                    value={password}
                    minLength='8'
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form> 
    )    
}
  
export default Login