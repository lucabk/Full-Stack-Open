import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState:[],
  reducers: {
    // Reducer to add a new anecdote
    addAnecdote(state, action){
      state.push({
        content:action.payload,
        id: getId(),
        votes:0
      })
    },
    // Reduce to add vote
    addVote(state, action){
      // anectode id to change 
      const id = action.payload
      // anectode obj to change
      const anecdoteToVote = state.find( a => a.id === id)
      // anectode obj changed
      const anecdoteVoted = {...anecdoteToVote, votes:anecdoteToVote.votes+1}
      // new state
      const newAnectodes = state.map( a => a.id !== id ? a : anecdoteVoted)  
      return newAnectodes
    },
    setAnectodes(state, action){
      return action.payload
    }
  }
})

export const {addAnecdote, addVote, setAnectodes} = anecdoteSlice.actions
export default anecdoteSlice.reducer