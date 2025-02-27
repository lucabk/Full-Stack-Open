import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  // Fetch anecdotes using react-query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: ()=>axios.get("http://localhost:3001/anecdotes/").then(res => res.data)
  })   

  // Show loading message while fetching data
  if (isPending) {
    return <span>Loading...</span>
  }

  // Show error message if fetching data fails
  if (isError) {
    return <span>{error.message}</span>
  }

  // Store fetched anecdotes in a variable
  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
