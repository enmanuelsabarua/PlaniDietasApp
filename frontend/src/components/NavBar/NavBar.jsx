import './NavBar.css';
import logo_icon from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const NavBar = ({ user }) => {
    const [activeLink, setActiveLink] = useState('calculator');

    const logout = () => {
        window.localStorage.clear();
        window.location.reload();
    }

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
                    {user && <li><Link to='/account' onClick={() => setActiveLink('account')} style={{ fontWeight: activeLink === 'account' && '600' }}>Cuenta</Link></li>}
                </ul>
                {user ?
                    <Link to='/login' onClick={logout}>
                        <div className="login-button">
                            <button>Cerrar sesión</button>
                        </div>
                    </Link>
                    :
                    <Link to='/login' onClick={() => setActiveLink('log in')}>
                        <div className="login-button">
                            <button>Iniciar sesión o registrarse</button>
                        </div>
                    </Link>
                }
            </div>
        </nav>
    )
}
