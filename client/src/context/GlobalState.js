import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState = {
    transactions: [
        {id: 1, name: 'Veggies', amount: '-500.25', type: 'outcome'},
        {id: 2, name: 'Lawn the mown', amount: '1000', type: 'income'},
        {id: 3, name: 'Lemonade', amount: '-200', type: 'outcome'},
    ],
    balance: -10
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            balance: state.balance
        }}>
            {children}    
        </GlobalContext.Provider>
    )
}