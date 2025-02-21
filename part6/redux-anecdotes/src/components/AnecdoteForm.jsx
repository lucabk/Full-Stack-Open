import { useDispatch } from "react-redux"
import { addNewAnectode } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    //add new anectode form handler
    const addAnectode = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNewAnectode(content))
  }

  return(
    <>
        <h2>create new</h2>
        <form onSubmit={addAnectode}>
            <div><input type="text" name="anecdote"/></div>
            <button type='submit'>create</button>
        </form>
    </>
  )
}

export default AnecdoteForm 