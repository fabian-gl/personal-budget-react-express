
const AppReducer = (state, action) => {

    switch(action.type)
    {
        case 'SET_ALERT':
            return {
                ...state,
                alert: {
                    showing: true,
                    message: action.message,
                    error: action.error
                }
            }

        case 'HIDE_ALERT':
            return {
                ...state,
                alert: {
                    ...state.alert,
                    showing: false,
                }
            }

        case 'SHOW_MODAL':
            return {
                ...state,
                idToEdit: action.id,
                showingModal: true
            }

        case 'HIDE_MODAL':
            return {
                ...state,
                idToEdit: undefined,
                showingModal: false
            }   

        case 'SET_LOADING_TRUE':
            return {
                ...state,
                balance: 0,
                loading: true
            }

        case 'SET_SUMMARY_INFORMATION':
            return {
                ...state,
                latestTransactions: action.data.latestTransactions,
                balance: action.data.balance,
                loading: false
            }

        case 'SET_ALL_TRANSACTIONS':
            return {
                ...state,
                transactions: action.data.transactions,
                loading: false
            }

        default: return state
    }
}

export default AppReducer
