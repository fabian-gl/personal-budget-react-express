import './TransactionList.css'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import Transaction from '../Transaction/Transaction'
import TitledContainer from '../TitledContainer/TitledContainer'

const TransactionList = () => {
    const {latestTransactions} = useContext(GlobalContext)
    return (
        <TitledContainer title='Latest transactions'>
            <div className="transaction-list">
                {latestTransactions.map(transaction => <Transaction key={transaction.id} {...transaction} />)}
            </div>
        </TitledContainer>
    )
}

export default TransactionList
