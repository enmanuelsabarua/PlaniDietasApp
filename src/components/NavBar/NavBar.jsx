import './NavBar.css';
import logo_icon from '../../assets/logo.png';

export const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className='logo'>
                <div className='logo-icon'>
                    <img src={logo_icon} alt="Meal" />
                </div>
                <p>Plani<span>Dietas</span></p>
            </div>
            <div className="navbar-right">
                <ul>
                    <li>Foro</li>
                    <li>Cuenta</li>
                </ul>
                <div className="login-button">
                    <button>Log in</button>
                </div>
            </div>
        </nav>
    )
}
