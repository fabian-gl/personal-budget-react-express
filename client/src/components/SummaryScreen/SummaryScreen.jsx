import './SummaryScreen.css'

import { useEffect, useContext } from 'react';

import { GlobalContext } from '../../context/GlobalState'

import TransactionList from '../TransactionList/TransactionList'
import Balance from '../Balance/Balance';

const SummaryScreen = () => {

    const { checkForToken, getSummaryInformation, latestTransactions, balance, loading } = useContext(GlobalContext);
    
    useEffect( () => {
        if (checkForToken()) getSummaryInformation()
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
