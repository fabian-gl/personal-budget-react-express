import './SummaryScreen.css'

import { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom"

import { GlobalContext } from '../../context/GlobalState'

import TransactionList from "../TransactionList/TransactionList";
import Balance from '../Balance/Balance';

const SummaryScreen = () => {

    const { getSummaryInformation, latestTransactions, balance, loading, userLogged } = useContext(GlobalContext);
    const history = useHistory()

    if(!userLogged) history.push('/login')
    
    useEffect( () => {
        getSummaryInformation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='cont-summary'>
            <div className="cont-balance">
                <Balance balance={balance} />
            </div>
            <div className="cont-transaction-list">
                <TransactionList loading={loading} title={'Latest transactions'} transactions={latestTransactions} />
            </div>
        </div>
    )
}

export default SummaryScreen
