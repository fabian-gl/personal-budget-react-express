
export const todayFormatted = () =>
{
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export const formatAmount = amount => {
    const absoluteAmount = Math.abs(Number(amount))
    const preffixMinus = (isNegative(amount) ? '-' : '')
    return `${preffixMinus}$ ${absoluteAmount.toFixed(2)}`
}

export const isNegative = amount => Number(amount) < 0
