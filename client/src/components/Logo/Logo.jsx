import './Logo.css'
import logoImg from '../../assets/finance-icon.png'

import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <div className='cont-logo'>
            <img src={logoImg} alt="Finance Company Logo" />
            <Link className='link-element' to='/'>
                <h2>My Budget</h2>
            </Link>
        </div>
    )
}

export default Logo
