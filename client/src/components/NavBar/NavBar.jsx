import './NavBar.css'

import { useContext } from 'react'

import NavBarItem from '../NavBarItem/NavBarItem'
import Logo from '../Logo/Logo'

import { GlobalContext } from '../../context/GlobalState'


const NavBar = () => {

    const { userLogged, userLogout, userName } = useContext(GlobalContext);

    const menu = ( userLogged ? [
        {name: 'Summary', route: '/'},
        {name: 'Edit Transactions', route: '/crud'}
    ] : [])

    const toggleMenuCelu = () => document.querySelector('.menu-cellphone').classList.toggle('hidden')

    const closeMenu = () => {
        document.querySelector('.cont-navbar .cont-hamburger input').click()
    }

    return (
        <div className='cont-navbar'>
            <div className="fila-nav-sup">

                <div className="cont-left">
                    <Logo />
                </div>
                <div className="cont-middle">
                    <div className="cont-buttons">
                        { menu.map((elem, index) => <NavBarItem {...elem} key={index}/>) }
                    </div>
                    { userLogged &&
                        <div className="cont-user">
                            {userName && <h6 className='greeting'>Welcome, {userName.split(' ')[0]}</h6>}
                            <h5 className='logout' onClick={userLogout}>Log out</h5>
                        </div>
                    }

                    <div className="cont-hamburger">
                        <div className="menu-wrap">
                            <input onClick={toggleMenuCelu} type="checkbox" className="toggler" />
                            <div className="hamburger"><div></div></div>
                        </div>
                    </div>

                </div>

            </div>
            <div>
                <div className="menu-cellphone hidden">
                    { menu.map((elem, index) => <NavBarItem onClick={closeMenu} {...elem} key={index}/>) }
                </div>
            </div>
            
        </div>
    )
}

export default NavBar
