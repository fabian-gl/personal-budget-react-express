import './SummaryScreen.css'

import TransactionList from "../TransactionList/TransactionList";
import Balance from '../Balance/Balance';
import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState'

const SummaryScreen = () => {
    const { getSummaryInformation, latestTransactions, balance, loading, setAlert } = useContext(GlobalContext);
    
    useEffect( () => {
        getSummaryInformation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
        setAlert('ffffff ffffff ffffff ffffff ffffff ffffff ffffff', false)
    }
    return (
        <div className='cont-summary'>
            <div className="cont-balance" onClick={handleClick}>
                <Balance balance={balance} />
            </div>
            <div className="cont-transaction-list">
                <TransactionList loading={loading} title={'Latest transactions'} transactions={latestTransactions} />
            </div>
        </div>
    )
}

export default SummaryScreen
