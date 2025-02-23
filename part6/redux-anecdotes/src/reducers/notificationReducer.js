import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name:"notification",
    initialState:"notification initial state",
    reducers:{
        showNotification(state, action){
            return action.payload
        }
    }
})

export default notificationSlice.reducer
export const { showNotification } = notificationSlice.actions