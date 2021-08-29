import './OptionType.css'

import { useState, useEffect } from 'react'

import moneyIn from '../../assets/money-in.png'
import moneyOut from '../../assets/money-out.png'

const INCOME_TYPE = 1
const OUTCOME_TYPE = -1

const OptionType = ({onOptionChange, typeFromInput = 0}) => {

    const [typeSelected, setTypeSelected] = useState(typeFromInput)
    useEffect(() => {
        setTypeSelected(typeFromInput)
    }, [typeFromInput])
    
    const handleOptionClick = type => {
        if (typeSelected === type)
        {
            setTypeSelected(0)
            onOptionChange(0)
        }
        else
        {
            setTypeSelected(type)
            onOptionChange(type)
        }
    }

    return (
        <div className='cont-option-type'>
            <img src={moneyIn} alt="" title='income'
                onClick={() => handleOptionClick(INCOME_TYPE)} 
                className={(typeSelected === OUTCOME_TYPE ? 'option-not-selected' : '')}/>
            
            <img src={moneyOut} alt="" title='outcome'
                onClick={() => handleOptionClick(OUTCOME_TYPE)} 
                className={(typeSelected === INCOME_TYPE ? 'option-not-selected' : '')}/>
        </div>
    )
}

export default OptionType
