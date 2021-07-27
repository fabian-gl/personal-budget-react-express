import './TransactionList.css'

import TitledContainer from '../TitledContainer/TitledContainer'
import Transaction from '../Transaction/Transaction'
import Spinner from '../Spinner/Spinner'

const TransactionList = ({ transactions, title, editable=false, loading=false }) => {

    return (
        <TitledContainer title={title}>
            <div className="transaction-list">
                {loading && <Spinner />}
                {!loading && transactions.map(transaction => <Transaction editable={editable} key={transaction.id} {...transaction} />)}
            </div>
        </TitledContainer>
    )
}

export default TransactionList
