import './Transaction.css'
import moneyIn from '../../assets/money-in.png'
import moneyOut from '../../assets/money-out.png'
import { formatAmount } from '../../utils'


const transaction = ({name, amount, type}) => {
    const formattedAmount = formatAmount(amount)
    const iconToShow = (type === 'income' ? moneyIn : moneyOut)

    return (
        <div className='cont-transaction'>
            <div className="cont-img">
                <img src={iconToShow} alt="" />
            </div>
            <div className="cont-name">
                <div>{name}</div>
            </div>
            <div className="cont-amount">
                <div className={type}>{formattedAmount}</div>
            </div>
        </div>
    )
}

export default transaction
