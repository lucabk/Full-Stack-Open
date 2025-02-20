import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

//creates the store based on the reducer
const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
    console.log("good button")
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={e => store.dispatch({type: 'OK'})}>ok</button> 
      <button onClick={e => store.dispatch({type: 'BAD'})}>bad</button>
      <button onClick={e => store.dispatch({type: 'ZERO'})}>reset stats</button>

      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
