
const AppReducer = (state, action) => {
    switch(action.type)
    {
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                loading: true
            }
        case 'GET_SUMMARY_INFORMATION':
            return {
                ...state,
                latestTransactions: action.data.latestTransactions,
                balance: action.data.balance,
                loading: false
            }
        default: return state
    }
}

export default AppReducer
