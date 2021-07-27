export const formatDate = date => {
    if (date) return date.split('T')[0]
}

export const formatAmount = amount => {
    const absoluteAmount = Math.abs(Number(amount))
    const preffixMinus = (isNegative(amount) ? '-' : '')
    return `${preffixMinus}$ ${absoluteAmount}`
}

export const isNegative = amount => Number(amount) < 0

export const ajaxCall = (url, method, objParams) => {
    return new Promise ((resolve, reject) => {
        const xhttp = new XMLHttpRequest()

        xhttp.open(method, url, true)
        xhttp.setRequestHeader('cors', 'cors')
        
        xhttp.onreadystatechange = () => 
        {
          if (xhttp.readyState === 4)
            if (isStatusCodeOk(xhttp.status)) resolve(JSON.parse(xhttp.responseText))
            else reject('Hubo un problema al enviar la solicitud')
        }

        if (objParams)
        {
            xhttp.setRequestHeader('Content-Type', 'application/json')
            xhttp.send(JSON.stringify(objParams))
        }
        else xhttp.send()

    })
}

const isStatusCodeOk = (statusCode) => statusCode >= 200 && statusCode < 300
