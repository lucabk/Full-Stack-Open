import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    //add new anectode form handler
    const addAnectode = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // distpatch action addAnectode 
    dispatch(addAnecdote(content))

    // 5 sec notification
    // Dispatch the "showNotification" action with the input value
    dispatch(showNotification("you added "+ content))
    setTimeout(() => {
        // Dispatch the "hideNotification" action after 5 seconds
        dispatch(hideNotification(""))
    }, 5000)
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