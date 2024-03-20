import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
    return (
        <div className='footer'>
            <Link to='/'>
                <div className='logo'>
                    <p>Plani<span>Dietas</span></p>
                </div>
            </Link>
            <div className="footer-info">
                <p>Copyright @ 2024 - Todos los derechos reservados.</p>
                <p>Enmanuel Sánchez Abarúa 2020-0757</p>
                <p>Jose Enmanuel Minier Colon 2020-0928</p>
            </div>
        </div>
    )
}
