import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { getSummaryInformationCall } from '../serverCalls'


const initialState = {
    transactions: [],
    balance: -10
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const getSummaryInformation = async () => {
        const response = await getSummaryInformationCall()
        dispatch({
            type: 'GET_SUMMARY_INFORMATION',
            data: response
          });
    }
    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            balance: state.balance,
            getSummaryInformation,
        }}>
            {children}    
        </GlobalContext.Provider>
    )
}