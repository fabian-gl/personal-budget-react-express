import './EditModal.css'

import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState'
import { todayFormatted } from '../../utils'
import OptionType from '../OptionType/OptionType';

const EditModal = () => {
    const { addTransaction, updateTransaction, deleteTransaction, hideModal, transactions, idToEdit } = useContext(GlobalContext);

    const currentTransaction = (idToEdit ? transactions.find(transaction => transaction.id === idToEdit) : {})
    
    const [transactionName, setTransactionName] = useState(currentTransaction.name || '')
    const [transactionAmount, setTransactionAmount] = useState(currentTransaction.amount || '')
    const [transactionDate, setTransactionDate] = useState(currentTransaction.date || todayFormatted())
    const [transactionType, setTransactionType] = useState(currentTransaction.type || '')

    const [typeFromInput, setTypeFromInput] = useState(0)

    const handleNameChange = e => {
        setTransactionName(e.target.value)
    }
    const handleAmountChange = e => {
        setTransactionAmount(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.key === '+') setTypeFromInput(1)
        else if (e.key === '-') setTypeFromInput(2)
    }

    const handleTypeChange = newType => {
        setTransactionType(newType)
        if ((Number(transactionAmount) > 0 && newType === 2) || (Number(transactionAmount) < 0 && newType === 1)) setTransactionAmount(-transactionAmount)
    }

    const handleDateChange = e => {
        setTransactionDate(e.target.value)
    }

    const handleDeleteClick = async () => {
        await deleteTransaction(idToEdit)
        hideModal()
    }

    const handleUpdateClick = async () => {
        await updateTransaction(idToEdit, transactionName, transactionAmount, transactionDate)
        hideModal()
    }
    
    const handleAddClick = async () => {
        await addTransaction(transactionName, transactionAmount, transactionType, transactionDate)
        hideModal()
    }
    let modalTitle, submitButton, deleteTransactionElement
    if (idToEdit)
    {
        modalTitle = 'Edit or delete transaction'
        submitButton = <button onClick={handleUpdateClick}>Update transaction information</button>
        deleteTransactionElement = <button onClick={handleDeleteClick}>Delete transaction</button>
    }
    else
    {
        modalTitle = 'New transaction'
        submitButton = <button onClick={handleAddClick}>Add transaction</button>
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
            <OptionType initialType={typeFromInput} onOptionChange={handleTypeChange}/>

            <div className="cont-transaction-info">
                {deleteTransactionElement}
                
                <label htmlFor="transactionName">Transaction Name:</label>
                <input type="text" name='transactionName' 
                    value={transactionName} 
                    onChange={handleNameChange}/>
                
                <label htmlFor="transactionAmount">Transaction Amount:</label>
                <input type="number" name='transactionAmount' 
                    value={transactionAmount} 
                    onKeyDown={handleKeyDown}
                    onChange={handleAmountChange}/>
                
                <label htmlFor="transactionDate">Transaction Date:</label>
                <input type="date" name='transactionDate' 
                    value={transactionDate} 
                    onChange={handleDateChange}/>
                
                <div className="cont-submit">
                    {submitButton}
                </div>
            </div>
        </div>
    )
}

export default EditModal
