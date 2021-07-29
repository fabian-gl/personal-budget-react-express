import './OptionType.css'

import { useState, useEffect } from 'react'

import moneyIn from '../../assets/money-in.png'
import moneyOut from '../../assets/money-out.png'

const OptionType = ({onOptionChange, initialType = 0}) => {

    
    const [typeSelected, setTypeSelected] = useState(initialType)
    useEffect(() => {
        console.log(initialType)
        setTypeSelected(initialType)
    }, [initialType])
    
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
            <img src={moneyIn} alt=""  
                onClick={() => handleOptionClick(1)} 
                className={(typeSelected === 2 ? 'option-not-selected' : '')}/>
            
            <img src={moneyOut} alt=""  
                onClick={() => handleOptionClick(2)} 
                className={(typeSelected === 1 ? 'option-not-selected' : '')}/>
        </div>
    )
}

export default OptionType
