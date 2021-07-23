import './Balance.css'

import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import TitledContainer from '../TitledContainer/TitledContainer'
import { formatAmount, isNegative } from '../../utils'

const Balance = () => {

    const { balance } = useContext(GlobalContext)
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
