import './CRUDScreen.css'

import TransactionList from "../TransactionList/TransactionList";
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState'
import TransactionFilters from '../TransactionFilters/TransactionFilters';

const CRUDScreen = () => {
    const { getAllTransactions, transactions } = useContext(GlobalContext);
    useEffect( () => {
        getAllTransactions()
    }, [])

    const [filtersArray, setFiltersArray] = useState([1, 2])

    const onFiltersChange = (filtersToApply) => {
        setFiltersArray(filtersToApply)
    }

    return (
        <div className='cont-crud'>
            <h1>CRUD Screen</h1>
            <TransactionFilters onFiltersChange={onFiltersChange} />
            
            <div className="cont-transaction-list">
                <TransactionList editable={true} title={'Transactions'} transactions={transactions.filter(transaction => filtersArray.includes(transaction.type))} />
            </div>
        </div>
    )
}

export default CRUDScreen
