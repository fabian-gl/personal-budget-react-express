import './NavBar.css'

import NavBarItem from '../NavBarItem/NavBarItem'
import Logo from '../Logo/Logo'

const NavBar = () => {
    // const menu = ['Summary', 'Add or Edit Transaction']
    const menu = [
        {name: 'Summary', route: '/'},
        {name: 'Add or Edit Transaction', route: '/crud'}
    ]

    const toggleMenuCelu = () => document.querySelector('.menu-cellphone').classList.toggle('hidden')

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
                    { menu.map((elem, index) => <NavBarItem {...elem} key={index}/>) }
                </div>
            </div>
            
        </div>
    )
}

export default NavBar
