
import React, { createContext, useReducer } from 'react'

import { useHistory } from 'react-router-dom'

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
    alert: {message: '', showing: false},
    userName: ''
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const history = useHistory()

    const checkForToken = async () => {

        try {
            const response = await apiCalls.getUserName()
            const userName = response.data.userName

            dispatch({
                type: 'SET_USER_NAME',
                userName: userName,
            })

            dispatch({
                type: 'SET_LOGGED',
                logged: true,
            })
            return true

        } catch (error) {
            dispatch({
                type: 'SET_LOGGED',
                logged: false,
            })
            history.push('/login')
            return false
        }
    }

    const userRegister = async userData => {

        try {
            const response = await apiCalls.userRegister(userData)
            setAlert(response.data.message, false)
            return true
            
        } catch (error) {
            alertError(error, "Sorry, we couldn't sign you in")
            return false
        }
    }

    const userLogin = async userData => {
        
        try {
            const response = await apiCalls.userLogin(userData)
            setAlert(response.data.message, false)

            dispatch({
                type: 'SET_USER_NAME',
                userName: response.data.name
            })

            localStorage.setItem('access_token', response.data.token)

            checkForToken()
            return true

        } catch (error) {
            alertError(error, "Sorry, We couldn't log you in")
            return false
        }
    }

    const userLogout = () => {
        localStorage.removeItem('access_token')
        checkForToken()
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
            const response = await apiCalls.addTransaction(name, amount, type, date)
            getAllTransactions()
            setAlert(response.data.message, false)
        } catch (error) {
            alertError(error, 'Sorry, there was a problem adding the transaction')
        }
    }

    const updateTransaction = async (id, name, amount, date) => {

        try {
            const response = await apiCalls.updateTransaction(id, name, amount, date)
            getAllTransactions()
            setAlert(response.data.message, false)
        } catch (error) {
            alertError(error, 'Sorry, there was a problem updating the transaction')
        }
    }

    const deleteTransaction = async id => {
        try {
            const response = await apiCalls.deleteTransaction(id)
            
            getAllTransactions()
            setAlert(response.data.message, false)
        } catch (error) {
            alertError(error, 'Sorry, there was a problem deleting the transaction')
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
            if (error.response.status === 401) userLogout()
            alertError(error, 'Sorry, there was a problem fetching the data')

            dispatch({
                type: 'SET_SUMMARY_INFORMATION',
                data: {
                    balance: 0,
                    latestTransactions: []
                }
            })
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
            if (error.response.status === 401) userLogout()
            alertError(error, 'Sorry, there was a problem fetching the data')

            dispatch({
                type: 'SET_ALL_TRANSACTIONS',
                data: {transactions: []}
              })            
        }
    }

    function alertError(errorObject, fallbackMessage)
    {
        try {
            setAlert(errorObject.response.data.errors[0])
        } catch (error) {
            setAlert(fallbackMessage)
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
            userName: state.userName,
            checkForToken,
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
