import './NavBarItem.css'

import { NavLink } from 'react-router-dom'

const NavBarItem = ({name, route}) => {

    return (
        <div className="navbar-button">
            <NavLink className='link-element' exact to={route} activeClassName='selected'>
                {name}
            </NavLink>
        </div>
    )
}

export default NavBarItem
