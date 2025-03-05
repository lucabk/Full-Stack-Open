import { createContext,  useReducer } from 'react';

const userReducer = (state, action) => {
    switch(action.type){
        case 'SAVE_USER':
            return action.payload
        case 'DELETE_USER':
            return null
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [ user, userDispatcher ] = useReducer(userReducer, null)

    return(
        <UserContext.Provider value={[ user, userDispatcher ]} >
            {props.children}
        </UserContext.Provider >
    )
} 

export  default UserContext