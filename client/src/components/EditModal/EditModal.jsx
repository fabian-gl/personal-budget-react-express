import './EditModal.css'

import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState'
import { todayFormatted } from '../../utils'
import OptionType from '../OptionType/OptionType';

const INCOME_TYPE = 1
const OUTCOME_TYPE = -1

const EditModal = () => {
    const { addTransaction, updateTransaction, deleteTransaction, hideModal, transactions, idToEdit } = useContext(GlobalContext);

    const currentTransaction = (idToEdit ? transactions.find(transaction => transaction.id === idToEdit) : {})
    
    const [transactionName, setTransactionName] = useState(currentTransaction.name || '')
    const [transactionAmount, setTransactionAmount] = useState(currentTransaction.amount || '')
    const [transactionDate, setTransactionDate] = useState(currentTransaction.date || todayFormatted())
    const [transactionType, setTransactionType] = useState(currentTransaction.type || 0)

    const [typeFromInput, setTypeFromInput] = useState(0)



    const validateInputs = () => {
        if (transactionName.length < 2)
        {
            alert('Please enter a valid name')
            return false
        }

        if (!Number(transactionAmount) || isNaN(transactionAmount))
        {
            alert('Please enter a valid amount')
            return false
        }

        if ((transactionAmount * transactionType < 0))
        {
            alert(`Your original transaction was a ${(transactionType === 1 ? 'input' : 'output')}, and the sign of the new amount must be consistent with that`)
            return false
        }

        if (!transactionType)
        {
            alert('Please select income or outcome using the icons')
            return false
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(transactionDate))
        {
            alert('Please select a valid date')
            return false
        }    

        return true
    }

    const handleNameChange = e => {
        setTransactionName(e.target.value)
    }
    const handleAmountChange = e => {
        setTransactionAmount(e.target.value)
    }
    const handleKeyDown = e => {
        if (e.key === '+') updateTypeInput(INCOME_TYPE)
        else if (e.key === '-') updateTypeInput(OUTCOME_TYPE)
    }

    const updateTypeInput = newType => {
        setTypeFromInput(newType)
        setTransactionType(newType)
    }

    const handleTypeChange = newType => {
        setTransactionType(newType)
        if ((Number(transactionAmount) > 0 && newType === OUTCOME_TYPE) || (Number(transactionAmount) < 0 && newType === INCOME_TYPE)) setTransactionAmount(-transactionAmount)
    }

    const handleDateChange = e => {
        setTransactionDate(e.target.value)
    }

    const handleDeleteClick = async () => {
        try {
            await deleteTransaction(idToEdit)
            hideModal()
        } catch (error) {
            alert(error)
        }
    }

    const handleUpdateClick = async () => {
        try {
            if (!validateInputs()) return
            await updateTransaction(idToEdit, transactionName, transactionAmount, transactionDate)
            hideModal()
        } catch (error) {
            alert(error)
        }        
    }
    
    const handleAddClick = async () => {
        try {
            if (!validateInputs()) return
            await addTransaction(transactionName, transactionAmount, transactionType, transactionDate)
            hideModal()
        } catch (error) {
            alert(error)
        }           
    }

    const handleClickOutOfModal = e => {
        if (e.target.classList.contains('cont-outer-modal')) hideModal()
    }

    let modalTitle, submitButton, deleteTransactionElement, optionTypeInput
    if (idToEdit)
    {
        modalTitle = 'Edit or delete'
        submitButton = <button onClick={handleUpdateClick}>Update information</button>
        deleteTransactionElement = <button onClick={handleDeleteClick} className='delete'>Delete</button>
        optionTypeInput = null
    }
    else
    {
        modalTitle = 'New transaction'
        submitButton = <button onClick={handleAddClick}>Add transaction</button>
        deleteTransactionElement = null
        optionTypeInput = <OptionType typeFromInput={typeFromInput} onOptionChange={handleTypeChange}/>
    }

    return (
        <div className="cont-outer-modal" onClick={handleClickOutOfModal}>

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
                    <div className="cont-inner-transaction-info">
                        <label htmlFor="transactionName">Name:</label>
                        <input type="text" name='transactionName' autoComplete='off'
                            value={transactionName} 
                            onChange={handleNameChange}/>
                                <label htmlFor="transactionAmount">Amount:</label>
                        <div className="cont-amount-type">
                            <input type="number" name='transactionAmount' autoComplete='off'
                                value={transactionAmount} 
                                onKeyDown={handleKeyDown}
                                onChange={handleAmountChange}/>
                            {optionTypeInput}
                        </div>

                        <label htmlFor="transactionDate">Date:</label>
                        <input type="date" name='transactionDate' 
                            value={transactionDate} 
                            onChange={handleDateChange}/>
                        
                        <div className="cont-submit">
                            {submitButton}
                            {deleteTransactionElement}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditModal
