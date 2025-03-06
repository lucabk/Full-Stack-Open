import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import * as userService from '../services/users'

const UserBlogs = () => {
    // Get the userId from the URL parameters
    const userId = useParams().id

    // Retrieve the users data 
    const { isPending, error, isError, data } = useQuery({
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

    // Filter the users to find the blogs of the user with the matching userId
    const userBlogs = data.filter(user => user.id == userId)

    // Log the userBlogs to the console for debugging purposes
    //console.log('userBlogs:', userBlogs[0].blogs)

    //user who added the blogs
    const owner = userBlogs[0].name

    return(
        <section>
            <h2>{owner}</h2>
            <h3>added blogs</h3>
            <ul>
                {userBlogs[0].blogs.map(b =>(
                    <li key={b.id}>
                        {b.title}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default UserBlogs