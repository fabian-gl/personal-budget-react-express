import './EditModal.css'

import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState'
import { formatDate } from '../../utils'

const EditModal = () => {
    const { deleteTransaction, hideModal, getAllTransactions, transactions, idToEdit } = useContext(GlobalContext);

    const currentTransaction = (idToEdit ? transactions.find(transaction => transaction.id === idToEdit) : {})
    
    const [transactionName, setTransactionName] = useState(currentTransaction.name)
    const [transactionAmount, setTransactionAmount] = useState(currentTransaction.amount)
    const [transactionDate, setTransactionDate] = useState(currentTransaction.date)
    const [transactionType, setTransactionType] = useState(currentTransaction.type)


    const handleNameChange = (e) => {
        setTransactionName(e.target.value)
    }
    const handleAmountChange = (e) => {
        setTransactionAmount(e.target.value)
    }
    const handleDateChange = (e) => {
        setTransactionDate(e.target.value)
    }

    const handleDeleteClick = async () => {
        await deleteTransaction(idToEdit)
        getAllTransactions()
        hideModal()
    }
    
    let modalTitle, submitButtonTitle, deleteTransactionElement
    if (idToEdit)
    {
        modalTitle = 'Edit or delete transaction'
        submitButtonTitle = 'Update transaction information'
        deleteTransactionElement = <button onClick={handleDeleteClick}>Delete transaction</button>
    }
    else
    {
        modalTitle = 'New transaction'
        submitButtonTitle = 'Add new transaction'
        deleteTransactionElement = null
    }

    return (
        <div className='cont-modal'>
            <div className="cont-header">
                <div className="cont-title">
                    <div>{modalTitle}</div>
                </div>
                <div className="cont-close" onClick={hideModal}>
                    <div>&#x2716;</div>
                </div>
            </div>
            <div className="cont-transaction-info">
                {deleteTransactionElement}
                
                <label htmlFor="transactionName">Transaction Name:</label>
                <input type="text" name='transactionName' 
                value={transactionName} 
                onChange={handleNameChange}/>
                
                <label htmlFor="transactionAmount">Transaction Amount:</label>
                <input type="text" name='transactionAmount' 
                value={transactionAmount} 
                onChange={handleAmountChange}/>
                
                <label htmlFor="transactionDate">Transaction Date:</label>
                <input type="date" name='transactionDate' 
                value={formatDate(transactionDate)} 
                onChange={handleDateChange}/>
                
                <div className="cont-submit">
                    <button>{submitButtonTitle}</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal
