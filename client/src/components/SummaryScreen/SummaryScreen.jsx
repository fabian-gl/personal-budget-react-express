import './SummaryScreen.css'

import TransactionList from "../TransactionList/TransactionList";
import Balance from '../Balance/Balance';
import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState'

const SummaryScreen = () => {
    const { getSummaryInformation, latestTransactions, balance } = useContext(GlobalContext);
    useEffect( () => {
        getSummaryInformation()
    }, [])

    return (
        <div className='cont-summary'>
            <div className="cont-balance">
                <Balance balance={balance} />
            </div>
            <div className="cont-transaction-list">
                <TransactionList title={'Latest transactions'} transactions={latestTransactions} />
            </div>
        </div>
    )
}

export default SummaryScreen
