import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
import { getAll, addVote } from './requests'

const App = () => {
  // Initialize the query client
  const queryClient = useQueryClient()

  // Mutation to handle adding a vote to an anecdote
  const addVoteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      // Invalidate the 'anecdotes' query to refetch the data after a vote is added
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  //handle add vote
  const handleVote = (anecdote) => {
    console.log("voted")
    addVoteMutation.mutate({ ...anecdote, votes:anecdote.votes+1 })
  }

  // Fetch anecdotes using react-query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
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
      <AnecdoteForm queryClient={queryClient}/>
    
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
