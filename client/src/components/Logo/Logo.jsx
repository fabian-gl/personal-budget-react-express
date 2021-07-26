import './Logo.css'
import logoImg from '../../assets/finance-icon.png'

import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link className='link-element' to='/'>
            <div className='cont-logo'>
                <img src={logoImg} alt="Finance Company Logo" />
                <h2>My Budget</h2>
            </div>
        </Link>
    )
}

export default Logo
