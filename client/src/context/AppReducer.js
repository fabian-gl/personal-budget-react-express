
const AppReducer = (state, action) => {
    switch(action.type)
    {
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
                loading: true
            }
            
        case 'DELETE_TRANSACTION':
            return {
                ...state,

            }            
            
        case 'GET_SUMMARY_INFORMATION':
            return {
                ...state,
                latestTransactions: action.data.latestTransactions,
                balance: action.data.balance,
                loading: false
            }

        case 'GET_ALL_TRANSACTIONS':
            return {
                ...state,
                transactions: action.data.transactions,
                loading: false
            }

        default: return state
    }
}

export default AppReducer
