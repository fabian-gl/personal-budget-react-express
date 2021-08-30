import axios from 'axios'

const apiRootUrl = 'http://localhost:5000'

export const addTransaction = async (name, amount, type, date) => {
    return axios.post(`${apiRootUrl}/api/v1/transactions`,{name, amount, type, date})
}

export const updateTransaction = async (id, name, amount, date) => {
    return axios.put(`${apiRootUrl}/api/v1/transactions`, {id, name, amount, date})
}

export const deleteTransaction = id => {
    return axios.delete(`${apiRootUrl}/api/v1/transactions`, {data:{id}})
}

export const getSummaryInformation = () => {
    return axios.get(`${apiRootUrl}/api/v1/transactions/summary`)
}

export const getTransactions = async () => {
    return axios.get(`${apiRootUrl}/api/v1/transactions`)
}

export const userLogin = async userData => {
    return axios.post(`${apiRootUrl}/api/v1/user/login`, {data: userData})
}

export const userRegister = async userData => {
    return axios.post(`${apiRootUrl}/api/v1/user/register`, {data: userData})
}

export const userLogout = async () => {
    return axios.post(`${apiRootUrl}/api/v1/user/logout`)
}