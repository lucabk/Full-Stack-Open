import { useState } from 'react'
import * as authService from '../services/authentication'
import * as blogService from '../services/blogs'
import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'
import UserContext from '../context/userContext'
import { FormField, Button, Message, Form, Container, Header } from 'semantic-ui-react'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, notificationDispatcher] = useContext(NotificationContext) 
    const [userStore, userStoreDispatcher] = useContext(UserContext)


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
            userStoreDispatcher({ type : 'SAVE_USER', payload : user})
            //set token
            blogService.setToken(user.token)
            //clear login form
            setUsername('')
            setPassword('')
            console.log(`${user.username} logged in`)
        }catch(err){
            console.error(err)
            //notification error
            notificationDispatcher({ type:'SHOW_NOTIFICATION', payload: {msg: 'Wrong credentials', type:'error' }})
            setTimeout(() => {
                notificationDispatcher({ type:'HIDE_NOTIFICATION' })
            }, 5000)
        }
    }
    
    return(
        <Container className='mt-9' textAlign='center'>
            <Header as='h2'>Login to application</Header>
            <Form onSubmit={handleLogin}>
                <FormField>
                    <label>username</label>
                    <input autoFocus
                        type="text"
                        name="Username"
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </FormField>
                <FormField>
                    <label>password</label>
                    <input
                        type="password"
                        name="Password"
                        value={password}
                        minLength='8'
                        onChange={({target}) => setPassword(target.value)}
                    />
                </FormField>
                <Message
                    success
                    header='Log in successfully'
                />
                <Button type="submit">Login</Button>
            </Form> 
        </Container >
    )    
}
  
export default Login