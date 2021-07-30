import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { addTransactionCall, getSummaryInformationCall, getTransactionsCall, deleteTransactionCall, updateTransactionCall } from '../serverCalls'


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

    const hideModal = () => {
        dispatch({
            type: 'HIDE_MODAL'
        })
    }

    const addTransaction = async (name, amount, type, date) => {

        const response = await addTransactionCall(name, amount, type, date)

        console.log(response)
        getAllTransactions()
    }

    const updateTransaction = async (id, name, amount, date) => {

        const response = await updateTransactionCall(id, name, amount, date)

        console.log(response)
        getAllTransactions()
    }

    const deleteTransaction = async id => {

        const response = await deleteTransactionCall(id)

        console.log(response)
        getAllTransactions()

    }

    const getSummaryInformation = async () => {

        dispatch({
            type: 'SET_LOADING_TRUE'
        })
        try {
            const response = await getSummaryInformationCall()
    
            dispatch({
                type: 'GET_SUMMARY_INFORMATION',
                data: response
            })
        } catch (error) {
            dispatch({
                type: 'SET_LOADING_FALSE'
            })
            alert(error)
        }
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
            addTransaction,
            updateTransaction,
            deleteTransaction,
            getSummaryInformation,
            getAllTransactions,
        }}>
            {children}    
        </GlobalContext.Provider>
    )
}