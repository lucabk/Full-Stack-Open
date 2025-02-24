import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name:"notification",
    initialState:"",
    reducers:{
        showNotification(state, action){
            return action.payload
        },
        hideNotification(state, action){
            return action.payload
        }
    }
})

//action creator for notification
export const setNotification = (content) => {
    return dispatch => {
        dispatch(showNotification(content))
        setTimeout(() => {
            // Dispatch the "hideNotification" action after 5 seconds
            dispatch(hideNotification(""))
        }, 5000)
    }
}

export default notificationSlice.reducer
export const { showNotification, hideNotification } = notificationSlice.actions