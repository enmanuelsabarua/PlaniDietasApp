import { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
    const [state, setState] = useState('Iniciar sesión');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const login = async e => {
        e.preventDefault();
        console.log('Login', formData);
    }

    const signup = async e => {
        e.preventDefault();
        console.log('Signup', formData);
    }

    return (
        <div className="loginsignup">
            <form className="loginsignup-container" onSubmit={e => { state === 'Iniciar sesión' ? login(e) : signup(e) }}>
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === 'Registrarse' && <input type="text" placeholder="Tu nombre" name='username' required value={formData.username} onChange={changeHandler} />}
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
            </form>
        </div>
    )
}
