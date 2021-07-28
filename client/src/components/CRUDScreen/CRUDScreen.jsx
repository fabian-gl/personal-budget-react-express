import './CRUDScreen.css'

import TransactionList from "../TransactionList/TransactionList";
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState'
import TransactionFilters from '../TransactionFilters/TransactionFilters';
import EditModal from '../EditModal/EditModal';

const CRUDScreen = () => {
    const { showingModal, getAllTransactions, transactions, loading } = useContext(GlobalContext);
    
    useEffect( () => {
        getAllTransactions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const modal = (showingModal ? <EditModal/> : null)
    const [filtersArray, setFiltersArray] = useState([1, 2])

    const onFiltersChange = (filtersToApply) => {
        setFiltersArray(filtersToApply)
    }

    const handleButtonClick = () => {
        console.log('object')
    }

    return (
        <div className='cont-crud'>
            {modal}
            <button onClick={handleButtonClick}>Add new Transaction</button>
            <TransactionFilters onFiltersChange={onFiltersChange} />
            <div className="cont-transaction-list">
                <TransactionList loading={loading} editable={true} title={'Transactions'} transactions={transactions.filter(transaction => filtersArray.includes(transaction.type))} />
            </div>
        </div>
    )
}

export default CRUDScreen
