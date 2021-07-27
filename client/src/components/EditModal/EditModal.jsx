import './EditModal.css'

import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState'
import { formatDate } from '../../utils'

const EditModal = () => {
    const { deleteTransaction, hideModal, getAllTransactions, transactions, idToEdit } = useContext(GlobalContext);

    const [currentTransaction, setCurrentTransaction] = useState((idToEdit ? transactions.find(transaction => transaction.id === idToEdit) : {}))
    
    console.log(idToEdit)
    console.log(currentTransaction)
    console.log(transactions)

    const handleDeleteClick = () => {
        deleteTransaction(idToEdit)
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
                <input type="text" name='transactionName' value={currentTransaction.name} />
                
                <label htmlFor="transactionAmount">Transaction Amount:</label>
                <input type="text" name='transactionAmount' value={currentTransaction.amount} />
                
                <label htmlFor="transactionDate">Transaction Date:</label>
                <input type="date" name='transactionDate' value={formatDate(currentTransaction.date)} />
                
                <div className="cont-submit">
                    <button>{submitButtonTitle}</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal
