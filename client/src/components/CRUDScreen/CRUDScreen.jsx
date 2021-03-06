import './CRUDScreen.css'

import { useEffect, useContext, useState } from 'react';

import { GlobalContext } from '../../context/GlobalState'

import TransactionList from "../TransactionList/TransactionList";
import TransactionFilters from '../TransactionFilters/TransactionFilters';
import EditModal from '../EditModal/EditModal';


const CRUDScreen = () => {
    
    const { checkForToken, showModal, showingModal, getAllTransactions, transactions, loading } = useContext(GlobalContext);
    
    useEffect( () => {
        if (checkForToken()) getAllTransactions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const modal = (showingModal ? <EditModal/> : null)
    const [filtersArray, setFiltersArray] = useState([1, -1])

    const onFiltersChange = (filtersToApply) => {
        setFiltersArray(filtersToApply)
    }

    const handleButtonClick = () => showModal()
    
    return (
        <div className='cont-crud'>
            {modal}
            <div className="cont-sup">
                <TransactionFilters onFiltersChange={onFiltersChange} />
                <button onClick={handleButtonClick}>Add new Transaction</button>
            </div>
            <div className="cont-transaction-list">
                <TransactionList loading={loading} editable={true} transactions={transactions.filter(transaction => filtersArray.includes(transaction.type))} />
            </div>
        </div>
    )
}

export default CRUDScreen
