import axios from 'axios'

const apiRootUrl = 'http://localhost:5000'

const getToken = () => localStorage.getItem('access_token') || ''

export const addTransaction = async (name, amount, type, date) => {
    return axios.post(`${apiRootUrl}/api/v1/transactions`,{name, amount, type, date},
        { headers: {Authorization: `Bearer ${getToken()}`}} )
}

export const updateTransaction = async (id, name, amount, date) => {
    return axios.put(`${apiRootUrl}/api/v1/transactions`, { id, name, amount, date },
        { headers: {Authorization: `Bearer ${getToken()}`}} )
}

export const deleteTransaction = id => {
    return axios.delete(`${apiRootUrl}/api/v1/transactions`, { data: { id }, 
        headers: {Authorization: `Bearer ${getToken()}`} })
}

export const getSummaryInformation = () => {
    return axios.get(`${apiRootUrl}/api/v1/transactions/summary`, 
        { headers: {Authorization: `Bearer ${getToken()}`}} )
}

export const getTransactions = async () => {
    return axios.get(`${apiRootUrl}/api/v1/transactions`,
        { headers: {Authorization: `Bearer ${getToken()}`}} )
}

export const userLogin = async userData => {
    return axios.post(`${apiRootUrl}/api/v1/user/login`, {...userData })
}

export const userRegister = async userData => {
    return axios.post(`${apiRootUrl}/api/v1/user/register`, {...userData})
}

export const getUserName = async () => {
    return axios.get(`${apiRootUrl}/api/v1/user/name`,
        { headers: {Authorization: `Bearer ${getToken()}`}} )
}