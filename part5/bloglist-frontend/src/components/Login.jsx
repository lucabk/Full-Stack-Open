const Login = ({handleLogin, username, setUsername, password, setPassword}) => (
    <form onSubmit={handleLogin}>
        <div>
            <h2>Login to application</h2>
            username:
            <input
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

export default Login