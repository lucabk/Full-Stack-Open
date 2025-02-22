import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const a = useSelector(({anectodes, filter}) => {
        if (filter===""){
            return anectodes
        }
        return anectodes.filter( a => a.content.includes(filter))
    })
    const dispatch = useDispatch()
  
    const vote = (id) => {
      //dispatch action creatore "addVote"
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