import './TransactionList.css'

import TitledContainer from '../TitledContainer/TitledContainer'
import Transaction from '../Transaction/Transaction'

const TransactionList = ({ transactions, title }) => {
    return (
        <TitledContainer title={title}>
            <div className="transaction-list">
                {transactions.map(transaction => <Transaction key={transaction.id} {...transaction} />)}
            </div>
        </TitledContainer>
    )
}

export default TransactionList
