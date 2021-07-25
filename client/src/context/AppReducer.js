
const AppReducer = (state, action) => {
    switch(action.type)
    {
        case 'GET_SUMMARY_INFORMATION':
            return {
                ...state,
                transactions: action.data
            }
        default: return state
    }
}

export default AppReducer
