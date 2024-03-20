import './NavBar.css';
import logo_icon from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('calculator');
    return (
        <nav className='navbar'>
            <Link to='/'>
                <div className='logo' onClick={() => setActiveLink('calculator')}>
                    <div className='logo-icon'>
                        <img src={logo_icon} alt="Meal" />
                    </div>
                    <p>Plani<span>Dietas</span></p>
                </div>
            </Link>
            <div className="navbar-right">
                <ul>
                    <li><Link to='/forum' onClick={() => setActiveLink('forum')} style={{ fontWeight: activeLink === 'forum' && '600' }}>Foro</Link></li>
                    <li><Link to='/account' onClick={() => setActiveLink('account')} style={{ fontWeight: activeLink === 'account' && '600' }}>Cuenta</Link></li>
                </ul>
                <Link to='/login' onClick={() => setActiveLink('log in')}>
                    <div className="login-button">
                        <button>Regístrate</button>
                    </div>
                </Link>
            </div>
        </nav>
    )
}
