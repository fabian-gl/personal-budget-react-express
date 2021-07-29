import { ajaxCall } from './utils'


export const addTransactionCall = async (name, amount, type, date) => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions','post',{name, amount, type, date})
}

export const updateTransactionCall = async (id, name, amount, date) => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions','put',{id, name, amount, date})
}

export const deleteTransactionCall = async id => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions','delete',{id})
}

export const getSummaryInformationCall = async () => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions/summary','get')
}

export const getTransactionsCall = async () => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions','get')
}