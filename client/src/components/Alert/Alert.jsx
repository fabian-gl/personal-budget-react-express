import './Alert.css'

import okLogo from '../../assets/ok.png'
import nokLogo from '../../assets/nok.png'

import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState'

const Alert = () => {
    const { alert, dismissAlert } = useContext(GlobalContext);
    const [timeoutHandler, setTimeoutHandler] = useState(null)

    useEffect(() => {

        if (alert.showing)
        {
            const MILLISECONDS_HIDE_ALERT = 4000

            // If an alert dismiss was due and the alert changes, reset the timer
            if (timeoutHandler) clearTimeout(timeoutHandler)

            setTimeoutHandler(setTimeout(() => {
                setTimeoutHandler(null)
                dismissAlert()
                console.log('effect')
            }, MILLISECONDS_HIDE_ALERT))
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alert])

    const classCont = (alert.showing ? '' : 'hidden')
    const logoToShow = (alert.error ? nokLogo : okLogo)
    const classAlert = (alert.error ? 'error' : 'success')

    return (
        <div className={`cont-alert ${ classCont }`} >
            <div className={`alert ${classAlert}`}>

                <div className="cont-icon">
                    <img src={logoToShow} alt="" />
                </div>

                <div className="cont-message">
                    <div>{alert.message}</div>
                </div>

                <div className="cont-close">
                    <div onClick={dismissAlert}>&#x2716;</div>
                </div>

            </div>
        </div>
    )
}

export default Alert
