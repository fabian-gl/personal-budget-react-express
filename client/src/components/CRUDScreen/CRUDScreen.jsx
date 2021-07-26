import './CRUDScreen.css'

import TransactionList from "../TransactionList/TransactionList";
import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState'

const CRUDScreen = () => {
    const { getAllTransactions, transactions } = useContext(GlobalContext);
    useEffect( () => {
        getAllTransactions()
    }, [])

    return (
        <div className='cont-crud'>
            <h1>CRUD Screen</h1>
            <div className="cont-transaction-list">
                <TransactionList title={'Transactions'} transactions={transactions} />
            </div>
        </div>
    )
}

export default CRUDScreen
