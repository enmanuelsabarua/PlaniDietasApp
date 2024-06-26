import './NavBar.css';
import logo_icon from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('calculator');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
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
                    {user.name &&
                        <>
                            <li><Link to='/forum' onClick={() => setActiveLink('forum')} style={{ fontWeight: activeLink === 'forum' && '600' }}>Foro</Link></li>
                            <li><Link to='/account' onClick={() => setActiveLink('account')} style={{ fontWeight: activeLink === 'account' && '600' }}>Cuenta</Link></li>
                        </>
                    }
                </ul>
                {user.name ?
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
