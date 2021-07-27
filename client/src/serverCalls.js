import { ajaxCall } from './utils'



export const deleteTransactionCall = async () => {
    // fetch('http://localhost:5000/api/v1/transactions', {method: 'delete', body:{id:23, prueba: 'dfsdf'}})
    // .then(res => {
    //     console.log(res)
    //     return res.json()
    // }).then(res => console.log(res))

    return await  ajaxCall('http://localhost:5000/api/v1/transactions','delete',{id:21344, prueba:'loco', error: true})
}

export const getSummaryInformationCall = async () => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions/summary','get')
}

export const getTransactionsCall = async () => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions','get')
}