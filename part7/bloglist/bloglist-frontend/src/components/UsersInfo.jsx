import { useQuery } from '@tanstack/react-query'
import * as userService from '../services/users'
import { Link } from 'react-router-dom'

const UserInfo = () => {
    // Fetch users data using react-query
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['users'],
        queryFn: userService.getAllUsers
    })
    // Show loading message while fetching data
    if (isPending) {
        return <span>Loading...</span>
    }
    // Show error message if fetching data fails
    if (isError) {
        return <span>{error.message}</span>
    }
    console.log('users:', data)

    return(
        <section>
            <h2 style={{marginTop:30}}>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default UserInfo