import './NavBar.css'

import { useContext } from 'react'

import NavBarItem from '../NavBarItem/NavBarItem'
import Logo from '../Logo/Logo'

import { GlobalContext } from '../../context/GlobalState'


const NavBar = () => {

    const { userLogged, userLogout } = useContext(GlobalContext);

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
