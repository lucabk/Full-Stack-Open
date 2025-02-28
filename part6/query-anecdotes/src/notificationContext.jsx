/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'

//reducer
const notificationReducer = (state, action) => {
    switch(action.type){
        case "SHOW_NOTIFICATION":
            return action.payload
        case "HIDE_NOTIFICATION":
            return ""
    }
}

// Create a context for the notification state and dispatch
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    // Use the useReducer hook to manage the notification state
    const [notification, notificationDispatcher] = useReducer(notificationReducer,"")

    return (
        <NotificationContext.Provider value={[notification, notificationDispatcher] }>
          {props.children}
        </NotificationContext.Provider>
      )
}

export default NotificationContext