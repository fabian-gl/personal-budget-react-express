import './Summary.css'
import TransactionList from "../TransactionList/TransactionList";
import Balance from '../Balance/Balance';
import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState'

const Summary = () => {
    const { getSummaryInformation } = useContext(GlobalContext);
    useEffect( () => {
        getSummaryInformation()
    }, [])

    return (
        <div className='cont-summary'>
            <h1>Summary</h1>
            <div className="cont-balance">
                <Balance />
            </div>
            <div className="cont-transaction-list">
                <TransactionList />
            </div>
        </div>
    )
}

export default Summary
