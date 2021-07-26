import './Logo.css'
import logoImg from '../../assets/finance-icon.png'

const Logo = () => {
    return (
        <div className='cont-logo'>
            <img src={logoImg} alt="Finance Company Logo" />
            <h2>My Budget</h2>
        </div>
    )
}

export default Logo
