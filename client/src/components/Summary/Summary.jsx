import './Summary.css'
import TransactionList from "../TransactionList/TransactionList";
import TitledContainer from '../TitledContainer/TitledContainer';
import Balance from '../Balance/Balance';

const Summary = () => {
    return (
        <div className='cont-summary'>
            <h1>Summary</h1>
            <div className="cont-balance">
                <Balance />
            </div>
            <div className="cont-transaction-list">
                <TransactionList />
            </div>
        </div>
    )
}

export default Summary
