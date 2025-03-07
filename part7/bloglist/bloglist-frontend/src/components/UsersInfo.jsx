import { useQuery } from '@tanstack/react-query'
import * as userService from '../services/users'
import { Link } from 'react-router-dom'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    Container,
    TableCell,
    TableBody,
    Table,
    Icon,
  } from 'semantic-ui-react'

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
        <Container>
            <h2 style={{marginTop:30}}>Users</h2>
            <Table celled>
    <TableHeader>
      <TableRow>
        <TableHeaderCell><Icon name='user'></Icon>username</TableHeaderCell>
        <TableHeaderCell><Icon name='book'></Icon>blogs created</TableHeaderCell>
      </TableRow>
    </TableHeader>

    <TableBody>
         {data.map(user => (
            <TableRow key={user.id}>
                <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
         ))}
    </TableBody>
    </Table>
          </Container>
    )
}

export default UserInfo