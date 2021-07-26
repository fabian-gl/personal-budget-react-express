export const formatDate = date => {
    return date.split('T')[0]
}

export const formatAmount = amount => {
    const absoluteAmount = Math.abs(Number(amount))
    const preffixMinus = (isNegative(amount) ? '-' : '')
    return `${preffixMinus}$ ${absoluteAmount}`
}

export const isNegative = amount => Number(amount) < 0


// let intentos

// function ajaxCallVieja(url, obj, func = null)
// {
//   var xhttp = new XMLHttpRequest()
//   let formData = new FormData()

//   intentos = 1
//   xhttp.onreadystatechange = function() 
//   {
//     if (this.readyState === 4 && func) func(this.responseText)
//   };
//   xhttp.open("POST", "./" + url, true)

//   Object.keys(obj).forEach(key => {
//     formData.append(key, obj[key])
//   })

//   xhttp.ontimeout = function(e)
//   {
//     if (intentos < 4)
//     {
//       xhttp.open("POST", "./" + url, true)
//       Object.keys(obj).forEach(key => {
//         formData.append(key, obj[key])
//       })
//       xhttp.send(formData)
//       console.log("reintento " + intentos)
//       intentos++
//     }
//     else
//     {
//       if (func) func("La red se encuentra congestionada, intente nuevamente mas tarde")
//       console.log("La red se encuentra congestionada, intente nuevamente mas tarde")
//     }
    
//   }

//   xhttp.timeout = 2500

//   xhttp.send(formData)
// }


export const ajaxCall = (url, method, objParams) => {
    return new Promise ((resolve, reject) => {
        var xhttp = new XMLHttpRequest()
        let formData = new FormData()

        xhttp.open(method, url, true)
        xhttp.setRequestHeader('cors', 'cors')

        if (objParams)
        {
            Object.keys(objParams).forEach(key => {
                formData.append(key, objParams[key])
            })
        }

        xhttp.onreadystatechange = () => 
        {
          if (xhttp.readyState === 4) resolve(JSON.parse(xhttp.responseText))
        }

        if (objParams) xhttp.send(formData)
        else xhttp.send()

    })
}
