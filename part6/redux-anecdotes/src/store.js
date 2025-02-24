import { configureStore } from '@reduxjs/toolkit'

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

export default store