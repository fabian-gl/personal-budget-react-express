import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { getSummaryInformationCall, getTransactionsCall } from '../serverCalls'


const initialState = {
    latestTransactions: [],
    transactions: [],
    balance: 0,
    loading: false,
    showingModal: false,
    idToEdit: undefined
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const showModal = id => {
        dispatch({
            type: 'SHOW_MODAL',
            id: id
          })
    }

    const hideModal = id => {
        dispatch({
            type: 'HIDE_MODAL'
          })
    }

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
            showingModal: state.showingModal,
            idToEdit: state.idToEdit,
            showModal,
            hideModal,
            getSummaryInformation,
            getAllTransactions,
        }}>
            {children}    
        </GlobalContext.Provider>
    )
}