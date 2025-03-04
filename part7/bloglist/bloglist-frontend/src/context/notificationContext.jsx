import { createContext, useReducer } from 'react'

//initial state
const initialState = { type:'', msg : ''}

// Reducer function to handle notification state changes
const notificationReducer = (state, action) => {
    switch(action.type){
        // Show notification with the provided payload
        case 'SHOW_NOTIFICATION':
            return action.payload;
        // Hide notification by setting state to the initial state value
        case 'HIDE_NOTIFICATION':
            return initialState;
        // Return current state for any unknown action types
        default:
            return state;
    }
}

// Create a context for the notification state and dispatch
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    // Use the useReducer hook to manage the notification state
    const [notification, notificationDispatcher] = useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatcher] }>
          {props.children}
        </NotificationContext.Provider>
      )
}

export default NotificationContext