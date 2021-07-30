import './NavBarItem.css'

import { NavLink } from 'react-router-dom'

const NavBarItem = ({name, route}) => {

    return (
        <NavLink className='link-element navbar-button' exact to={route} activeClassName='selected'>
            {name}
        </NavLink>
    )
}

export default NavBarItem
