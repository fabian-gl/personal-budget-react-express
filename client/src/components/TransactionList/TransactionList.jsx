import './TransactionList.css'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import Transaction from '../Transaction/Transaction'
import TitledContainer from '../TitledContainer/TitledContainer'

const TransactionList = () => {
    const {transactions} = useContext(GlobalContext)
    return (
        <TitledContainer title='Latest transactions'>
            <div className="transaction-list">
                {transactions.map(transaction => <Transaction key={transaction.id} {...transaction} />)}
            </div>
        </TitledContainer>
    )
}

export default TransactionList
