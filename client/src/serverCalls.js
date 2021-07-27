import { ajaxCall } from './utils'



export const deleteTransactionCall = async id => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions','delete',{id})
}

export const getSummaryInformationCall = async () => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions/summary','get')
}

export const getTransactionsCall = async () => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions','get')
}