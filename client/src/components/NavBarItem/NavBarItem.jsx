import './NavBarItem.css'

import { NavLink } from 'react-router-dom'

const NavBarItem = ({name, route, onClick}) => {

    return (
        <NavLink onClick={onClick} className='link-element navbar-button' exact to={route} activeClassName='selected'>
            {name}
        </NavLink>
    )
}

export default NavBarItem
