import { ajaxCall } from './utils'

export const getSummaryInformationCall = async () => {
    const response = await  ajaxCall('http://localhost:5000/api/v1/transactions','get')
    return response.data
}