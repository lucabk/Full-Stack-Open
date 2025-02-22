import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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
  
    const vote = (id) => {
      //dispatch action creator "addVote"
      dispatch(addVote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
        )}
        </>
    )
}

export default AnecdoteList