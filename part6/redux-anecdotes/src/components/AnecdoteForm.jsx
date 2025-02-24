import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  //add new anectode form handler
  const addAnectode = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // distpatch action addAnectode 
    dispatch(createAnecdote(content))

    // Dispatch the "showNotification" action with the input value
    dispatch(setNotification("you added "+ content))
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