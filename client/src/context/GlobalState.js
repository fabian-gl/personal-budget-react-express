import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import * as apiCalls from '../apiCalls'

const initialState = {
    latestTransactions: [],
    transactions: [],
    balance: 0,
    userLogged: false,
    loading: false,
    showingModal: false,
    idToEdit: undefined,
    alert: {message: 'Holisss', showing: false}
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const userRegister = async userData => {

        try {
            await apiCalls.userRegister(userData)
            setAlert('Registration successful', false)
            return true
        } catch (error) {
            const errorList = error.response.data.errors || []
            if (errorList.length) setAlert(errorList[0])
            else setAlert("Sorry, We couldn't sign you in")

            return false
        }
    }

    const userLogin = async userData => {
        
        try {
            const response = await apiCalls.userLogin(userData)
            setAlert(response.data.message, false)
            // Save token
            return true
        } catch (error) {
            const errorList = error.response.data.errors || []
            if (errorList.length) setAlert(errorList[0])
            else setAlert("Sorry, We couldn't log you in")
            return false
        }

        dispatch({
            type: 'USER_LOGIN'
        })        
    }

    const userLogout = () => {
        dispatch({
            type: 'USER_LOGOUT'
        })
    }

    const setAlert = (message, error = true) => {
        dispatch({
            type: 'SET_ALERT',
            message,
            error
        })
    }

    const dismissAlert = () => {
        dispatch({ type: 'HIDE_ALERT' })
    }

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

        try {
            await apiCalls.addTransaction(name, amount, type, date)
            getAllTransactions()
            setAlert('Transaction added', false)
        } catch (error) {
            setAlert('Sorry, there was a problem adding the transaction')
        }
    }

    const updateTransaction = async (id, name, amount, date) => {

        try {
            await apiCalls.updateTransaction(id, name, amount, date)
            getAllTransactions()
            setAlert('Transaction updated', false)
        } catch (error) {
            setAlert('Sorry, there was a problem updating the transaction')
        }
    }

    const deleteTransaction = async id => {
        try {
            await apiCalls.deleteTransaction(id)
            
            getAllTransactions()
            setAlert('Transaction deleted', false)
        } catch (error) {
            setAlert('Sorry, there was a problem deleting the transaction')
        }
    }

    const getSummaryInformation = async () => {

        try {
            dispatch({ type: 'SET_LOADING_TRUE' })

            const response = await apiCalls.getSummaryInformation()
            dispatch({
                type: 'SET_SUMMARY_INFORMATION',
                data: response.data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: 'SET_SUMMARY_INFORMATION',
                data: {
                    balance: 0,
                    latestTransactions: []
                }
            })

            setAlert('Sorry, there was a problem fetching the data')
        }
    }

    const getAllTransactions = async () => {

        try {
            dispatch({ type: 'SET_LOADING_TRUE' })
    
            const response = await apiCalls.getTransactions()
            dispatch({
                type: 'SET_ALL_TRANSACTIONS',
                data: response.data
              })

        } catch (error) {
            dispatch({
                type: 'GET_ALL_TRANSACTIONS',
                data: {transactions: []}
              })            
            setAlert('Sorry, there was a problem fetching the data')
        }
    }

    return (
        <GlobalContext.Provider value={{
            latestTransactions: state.latestTransactions,
            transactions: state.transactions,
            balance: state.balance,
            loading: state.loading,
            showingModal: state.showingModal,
            idToEdit: state.idToEdit,
            alert: state.alert,
            userLogged: state.userLogged,
            userRegister,
            userLogin,
            userLogout,
            dismissAlert,
            setAlert,
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