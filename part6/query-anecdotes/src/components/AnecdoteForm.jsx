import { addNew } from "../requests"
import { useMutation } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useContext } from "react"
import NotificationContext from "../notificationContext"

const AnecdoteForm = ({ queryClient }) => {
  // Get the notification context
  const [notification, notificationDispatcher] = useContext(NotificationContext)

  // Mutation hook to add a new anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: addNew,
    onSuccess: () => {
      // Invalidate the 'anecdotes' query to refetch the data after a new anecdote is added
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      // Show a notification when there is an error adding a new anecdote
      notificationDispatcher({ type:"SHOW_NOTIFICATION", payload:"anecdote must be at leat 5 char long"})
      setTimeout(() => {
          // Dispatch the "hideNotification" action after 5 seconds
          notificationDispatcher({ type:"HIDE_NOTIFICATION" })
      }, 5000)
    }
  })

  //form handler  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // Use the mutation to add a new anecdote with initial votes set to 0
    newAnecdoteMutation.mutate({ content, votes: 0 })
    // Show a notification when a new anecdote is added
    notificationDispatcher({ type:"SHOW_NOTIFICATION", payload:"you added "+content})
    setTimeout(() => {
        // Dispatch the "hideNotification" action after 5 seconds
        notificationDispatcher({ type:"HIDE_NOTIFICATION" })
    }, 5000)

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
AnecdoteForm.propTypes = {
  queryClient: PropTypes.object.isRequired,
}

export default AnecdoteForm
