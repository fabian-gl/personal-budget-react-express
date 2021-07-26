import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { getSummaryInformationCall, getTransactionsCall } from '../serverCalls'


const initialState = {
    latestTransactions: [],
    transactions: [],
    balance: 0,
    loading: false
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const getSummaryInformation = async () => {

        dispatch({
            type: 'SET_LOADING_TRUE'
          })

        const response = await getSummaryInformationCall()

        dispatch({
            type: 'GET_SUMMARY_INFORMATION',
            data: response
          })
    }

    const getAllTransactions = async () => {

        dispatch({
            type: 'SET_LOADING_TRUE'
          })

        const response = await getTransactionsCall()

        dispatch({
            type: 'GET_ALL_TRANSACTIONS',
            data: response
          })
    }

    return (
        <GlobalContext.Provider value={{
            latestTransactions: state.latestTransactions,
            transactions: state.transactions,
            balance: state.balance,
            loading: state.loading,
            getSummaryInformation,
            getAllTransactions,
        }}>
            {children}    
        </GlobalContext.Provider>
    )
}