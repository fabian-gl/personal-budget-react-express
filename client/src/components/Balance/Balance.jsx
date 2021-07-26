import './Balance.css'

import TitledContainer from '../TitledContainer/TitledContainer'
import { formatAmount, isNegative } from '../../utils'

const Balance = ({ balance }) => {

    const className = `balance${(isNegative(balance) ? ' negative' : '')}`
    const formattedBalance = formatAmount(balance)

    return (
        <TitledContainer title='Balance'>
            <div className={className}>
                {formattedBalance}
            </div>
        </TitledContainer>
    )
}

export default Balance
