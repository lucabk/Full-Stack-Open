import { createSlice } from '@reduxjs/toolkit'

// Create a slice of the Redux state with the name 'filter'
const filterSlice = createSlice({
    name: 'filter', // Name of the slice
    initialState: "", // Initial state of the slice, an empty string
    reducers: {
        // Reducer to handle filtering anecdotes
        filterAnecdotes(state, action) {
            return action.payload // Update the state with the payload of the action
        }
    }
})

// Export the reducer function and the action creator
export default filterSlice.reducer
export const { filterAnecdotes } = filterSlice.actions