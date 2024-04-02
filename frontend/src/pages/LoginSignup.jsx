import { useContext, useState } from 'react';
import './CSS/LoginSignup.css';
import authService from '../services/auth';
import dietService from '../services/diets';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const LoginSignup = () => {
    const [state, setState] = useState('Iniciar sesión');
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
    });

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const login = async e => {
        e.preventDefault();
        try {
            const user = await authService.login({
                email: formData.email,
                password: formData.password
            });

            window.localStorage.setItem('loggedUser', JSON.stringify(user));
            dietService.setToken(user.token);
            setUser(user);
            setFormData({ name: '', password: '', email: '' });
            navigate('/');
        } catch (error) {
            setErrorMessage('Credenciales incorrectas');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }

    const signup = async e => {
        e.preventDefault();
        try {
            const user = await authService.signup({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            console.log(user);

            window.localStorage.setItem('loggedUser', JSON.stringify(user));
            dietService.setToken(user.token);
            setUser(user);
            setFormData({ name: '', password: '', email: '' });
            navigate('/');
        } catch (error) {
            setErrorMessage('Error al crear la cuenta');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }

    return (
        <div className="loginsignup">
            <form className="loginsignup-container" onSubmit={e => { state === 'Iniciar sesión' ? login(e) : signup(e) }}>
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === 'Registrarse' && <input type="text" placeholder="Nombre completo" name='name' required value={formData.name} onChange={changeHandler} />}
                    <input type="email" placeholder="Correo electrónico" name='email' required value={formData.email} onChange={changeHandler} />
                    <input type="password" placeholder="Contraseña" name='password' required value={formData.password} onChange={changeHandler} />
                </div>
                <button>Continuar</button>
                {state === 'Registrarse' ?
                    <p className="loginsignup-login">Ya tiene una cuenta? <span onClick={() => setState('Iniciar sesión')}>Inicie sesión aquí</span></p> :
                    <p className="loginsignup-login">Cree una cuenta <span onClick={() => setState('Registrarse')}>Click aquí</span></p>
                }
                {state === 'Registrarse' &&
                    <div className="loginsignup-agree">
                        <label>
                            <input type="checkbox" name="" id="" required />
                            Al continuar, acepto los términos de uso y la política de privacidad.
                        </label>
                    </div>
                }
                {errorMessage && <div className="loginsignup-error">{errorMessage}</div>}
            </form>
        </div>
    )
}
