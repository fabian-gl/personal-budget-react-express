import './Transaction.css'
import moneyIn from '../../assets/money-in.png'
import moneyOut from '../../assets/money-out.png'
import EditButton from '../EditButton/EditButton'

import { formatAmount, formatDate } from '../../utils'


const transaction = ({id, name, amount, type, date, editable = false}) => {
    const iconToShow = (type === 1 ? moneyIn : moneyOut)
    const className = (type === 1 ? 'income' : 'outcome')

    console.log(editable)
    const editElement = (editable ? <EditButton id={id} /> : null)
    return (
        <div className='cont-transaction'>
            <div className="cont-left">
                <img src={iconToShow} alt="" />
            </div>
            <div className="cont-middle">
                <div className='name'>{name}</div>
                <div className='date'>{formatDate(date)}</div>
            </div>
            <div className="cont-right">
                <div className={className}>{formatAmount(amount)}</div>
            </div>
            {editElement}
        </div>
    )
}

export default transaction
