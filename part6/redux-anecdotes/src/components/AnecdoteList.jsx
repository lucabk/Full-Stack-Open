import { useSelector, useDispatch } from 'react-redux'
import { modifyAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    // Get anecdotes and filter them based on the current filter value
    const a = useSelector(({anectodes, filter}) => {
        if (filter===""){
            return anectodes
        }
        return anectodes.filter( a => a.content.includes(filter))
    })
    
    // Get the dispatch function from the Redux store
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
        //anecdote id
        const id = anecdote.id

        //dispatch action "addVote"
        dispatch(modifyAnecdote(anecdote))

        //notification
        dispatch(setNotification("you voted "+ a.find( a => a.id === id ).content))
    }
  
    // Sort anecdotes by votes in descending order
    const sortedAnecdotes = [...a].sort((a, b) => b.votes - a.votes)

    return(
        <>
        {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
        )}
        </>
    )
}

export default AnecdoteList