import axios from 'axios'

const apiRootUrl = 'http://localhost:5000'


const getAuthHeaders = () => {
    const accessToken = localStorage.getItem('access_token') || ''
    return { Authorization: `Bearer ${accessToken}` }
}

export const addTransaction = (name, amount, type, date) => {
    return axios.post(`${apiRootUrl}/api/v1/transactions`,
        {name, amount, type, date}, 
        { headers: getAuthHeaders()} )
}

export const updateTransaction = (id, name, amount, date) => {
    return axios.put(`${apiRootUrl}/api/v1/transactions`, 
        { id, name, amount, date }, 
        { headers: getAuthHeaders()} )
}

export const deleteTransaction = id => {
    return axios.delete(`${apiRootUrl}/api/v1/transactions`, 
        { data: { id }, 
        headers: getAuthHeaders() })
}

export const getSummaryInformation = () => {
    return axios.get(`${apiRootUrl}/api/v1/transactions/summary`, 
        { headers: getAuthHeaders()} )
}

export const getTransactions = () => {
    return axios.get(`${apiRootUrl}/api/v1/transactions`, 
        { headers: getAuthHeaders()} )
}

export const userLogin = userData => {
    return axios.post(`${apiRootUrl}/api/v1/user/login`, 
        {...userData })
}

export const userRegister = userData => {
    return axios.post(`${apiRootUrl}/api/v1/user/register`, 
        {...userData})
}

export const getUserName = () => {
    return axios.get(`${apiRootUrl}/api/v1/user/name`, 
        { headers: getAuthHeaders()} )
}