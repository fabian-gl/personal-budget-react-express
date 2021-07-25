import './Transaction.css'
import moneyIn from '../../assets/money-in.png'
import moneyOut from '../../assets/money-out.png'
import { formatAmount } from '../../utils'


const transaction = ({name, amount, type}) => {
    const formattedAmount = formatAmount(amount)
    const iconToShow = (type === 1 ? moneyIn : moneyOut)
    const className = (type === 1 ? 'income' : 'outcome')

    return (
        <div className='cont-transaction'>
            <div className="cont-img">
                <img src={iconToShow} alt="" />
            </div>
            <div className="cont-name">
                <div>{name}</div>
            </div>
            <div className="cont-amount">
                <div className={className}>{formattedAmount}</div>
            </div>
        </div>
    )
}

export default transaction
