import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

//standard method for creating a Redux store
const store = configureStore({
  reducer: {
    anectodes: anecdotesReducer,
    filter: filterReducer,
    notification : notificationReducer
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)