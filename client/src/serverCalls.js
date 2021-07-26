import { ajaxCall } from './utils'

export const getSummaryInformationCall = async () => {
    return await  ajaxCall('http://localhost:5000/api/v1/transactions/summary','get')
}