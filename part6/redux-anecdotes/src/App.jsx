import AddAnectode from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initializeAnectodes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(initializeAnectodes())
    console.log("anectodes GET from json server and store updated")
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      < Notification />
      < Filter />
      < AnecdoteList />
      < AddAnectode />
    </div>
  )
}

export default App