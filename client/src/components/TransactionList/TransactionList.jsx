import './TransactionList.css'

import TitledContainer from '../TitledContainer/TitledContainer'
import Transaction from '../Transaction/Transaction'
import Spinner from '../Spinner/Spinner'
import NothingToShow from '../NothingToShow/NothingToShow'

const TransactionList = ({ transactions, title, editable=false, loading=false }) => {

    let infoToShow
    if (transactions.length)
    {
        infoToShow = transactions.map(transaction => 
            <Transaction 
                editable={editable} 
                key={transaction.id} 
                {...transaction} />)
    }
    else
        infoToShow = <NothingToShow message='No transactions to show...' />

    return (
        <TitledContainer title={title}>
            <div className="transaction-list">
                <div className="inner-transaction-list">
                    {loading && <Spinner />}
                    {!loading && infoToShow}
                </div>
            </div>
        </TitledContainer>
    )
}

export default TransactionList
