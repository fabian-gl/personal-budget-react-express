import './OptionType.css'

import { useState, useEffect } from 'react'

import moneyIn from '../../assets/money-in.png'
import moneyOut from '../../assets/money-out.png'

const OptionType = ({onOptionChange, typeFromInput = 0}) => {

    const [typeSelected, setTypeSelected] = useState(typeFromInput)
    useEffect(() => {
        console.log(typeFromInput)
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
                onClick={() => handleOptionClick(1)} 
                className={(typeSelected === 2 ? 'option-not-selected' : '')}/>
            
            <img src={moneyOut} alt="" title='outcome'
                onClick={() => handleOptionClick(2)} 
                className={(typeSelected === 1 ? 'option-not-selected' : '')}/>
        </div>
    )
}

export default OptionType
