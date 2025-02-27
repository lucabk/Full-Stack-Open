import { addNew } from "../requests"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


const AnecdoteForm = () => {
  // Initialize the query client
  const queryClient = useQueryClient()

  // Mutation hook to add a new anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: addNew,
    onSuccess: () => {
      // Invalidate the 'anecdotes' query to refetch the data after a new anecdote is added
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  //form handler  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // Use the mutation to add a new anecdote with initial votes set to 0
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
