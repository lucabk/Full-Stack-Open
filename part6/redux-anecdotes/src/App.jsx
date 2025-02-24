import AddAnectode from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import * as service from "./services/anecdotes"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAnectodes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    service.getAll().then(res => {
      console.log("anectodes GET from json server and store updated")
      dispatch(setAnectodes(res))
    })

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