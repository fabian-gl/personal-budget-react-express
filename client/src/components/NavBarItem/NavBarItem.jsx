import './NavBarItem.css'

import { Link } from 'react-router-dom'

const NavBarItem = ({name, route}) => {

    return (
        <div className="navbar-button">
            <Link className='link-element' to={route}>
                {name}
            </Link>
        </div>
    )
}

export default NavBarItem
