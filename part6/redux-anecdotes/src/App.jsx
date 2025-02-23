import AddAnectode from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
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